import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AppState } from '../../models/app-state';

import { createAction } from '../create-action';
import { KitModelsActions } from './kit-models.actions';
import { KitData } from '../../providers/kit-data';
import { AppActions } from '../app/app.actions';
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
      let kitModelsToUpdate = [];
      let kitModelsToDelete = [];
      let models = [];
      let oldKitModels = store.kitModels.results[action.payload.kitID] || [];

      // Figure out what kit models we need to create and update
      store.kitModels.tempKitModels.map(kitModel => {
        const existingKitModel = oldKitModels.find(oldKitModel => oldKitModel.modelID === kitModel.modelID);

        if (!existingKitModel) {
          kitModelsToCreate.push({
            modelID: kitModel.modelID,
            quantity: kitModel.quantity
          });
        } else if (existingKitModel.quantity !== kitModel.quantity) {
          kitModelsToUpdate.push({
            modelID: kitModel.modelID,
            quantity: kitModel.quantity
          });
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
      kitModelsToCreate.map(kitModel => {
        models.push(this.kitData.addKitModel(action.payload.kitID, kitModel).toPromise());
      });

      // Update the kit models
      kitModelsToUpdate.map(kitModel => {
        models.push(this.kitData.updateKitModel(action.payload.kitID, kitModel).toPromise());
      });

      // Delete the kit models
      kitModelsToDelete.map(modelID => {
        models.push(this.kitData.deleteKitModel(action.payload.kitID, modelID).toPromise());
      });

      return Observable.from(Promise.all(models))
        .concatMap(res => [
          createAction(KitModelsActions.UPDATE_SUCCESS, {
            results: store.kitModels.tempKitModels,
            kitID: action.payload.kitID
          }),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, action.payload.message),
          createAction(AppActions.POP_NAV)
        ])
        .catch(err => Observable.of(
          createAction(KitModelsActions.UPDATE_FAIL, err),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, err.message)
        ));
    });
}
