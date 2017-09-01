import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../models/app-state';

import { createAction } from '../create-action';
import { KitModelsActions } from './kit-models.actions';
import { KitData } from '../../providers/kit-data';
import { AppActions } from '../app/app.actions.ts';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class KitModelsEffects {
  constructor(
    public actions$: Actions,
    public kitData: KitData,
    public store$: Store<AppState>
  ) {}

  /**
   * Fetches kit models.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(KitModelsActions.FETCH)
    .mergeMap(action => this.kitData.getKitModels(action.payload)
      .map(res => createAction(KitModelsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(KitModelsActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates and deletes kit models belonging to a specific kit.
   */
  @Effect()
  update$ = this.actions$
    .ofType(KitModelsActions.UPDATE)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => {
      let kitModelsToCreate = [];
      let kitModelsToDelete = [];
      let models = [];
      let oldKitModels = store.kitModels.results[action.payload.kitID] || [];

      // Figure out what kit models we need to create
      store.kitModels.tempKitModels.map(kitModel => {
        const isNew = !oldKitModels.find(oldKitModel => oldKitModel.modelID === kitModel.modelID);

        if (isNew) {
          kitModelsToCreate.push(kitModel.modelID);
        }
      });

      // Figure out what kit models we need to delete
      oldKitModels.map(oldKitModel => {
        const isRemoved = !store.kitModels.tempKitModels.find(kitModel => kitModel.modelID === oldKitModel.modelID);

        if (isRemoved) {
          kitModelsToDelete.push(oldKitModel.modelID);
        }
      });

      // Create the kit models
      kitModelsToCreate.map(modelID => {
        models.push(this.kitData.addKitModel(action.payload.kitID, modelID).toPromise());
      });

      // Delete the kit models
      kitModelsToDelete.map(modelID => {
        models.push(this.kitData.deleteKitModel(action.payload.kitID, modelID).toPromise());
      });

      return Observable.from(Promise.all(models))
        .concatMap(res => [
          createAction(KitModelsActions.UPDATE_SUCCESS, {
            results: res,
            kitID: action.payload.kitID,
            kitModelsToDelete
          }),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, action.payload.message)
        ])
        .catch(err => Observable.of(
          createAction(KitModelsActions.UPDATE_FAIL, err),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, err.message)
        ));
    });
}
