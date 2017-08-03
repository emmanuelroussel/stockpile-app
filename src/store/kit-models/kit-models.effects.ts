import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { createAction } from '../create-action';
import { KitModelsActions } from './kit-models.actions';
import { KitData } from '../../providers/kit-data';
import { AppActions } from '../app/app.actions.ts';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class KitModelsEffects {
  constructor(
    public actions$: Actions,
    public kitData: KitData
  ) {}

  /**
   * Fetches kit models.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(KitModelsActions.FETCH)
    .mergeMap(action => this.kitData.getKitModels(action.payload)
      .map(res => createAction(KitModelsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(createAction(KitModelsActions.FETCH_FAIL, err)))
    );

  /**
   * On successful kit models creation, pop nav.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(KitModelsActions.UPDATE_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, action.payload.message),
      createAction(AppActions.POP_NAV)
    ))
    .delay(1);

  /**
   * Creates and deletes kit models belonging to a specific kit.
   */
  @Effect()
  update$ = this.actions$
    .ofType(KitModelsActions.UPDATE)
    .mergeMap(action => {
      let models = [];

      for (const modelID of action.payload.kitModelsToCreate) {
        models.push(this.kitData.addKitItem(action.payload.kit.kitID, modelID).toPromise());
      }

      for (const modelID of action.payload.kitModelsToDelete) {
        models.push(this.kitData.deleteKitItem(action.payload.kit.kitID, modelID).toPromise());
      }

      return Observable.of(Promise.all(models))
        .concatMap(res => [
          createAction(KitModelsActions.UPDATE_SUCCESS, { message: action.payload.message, results: res }),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE)
        ])
        .catch(err => Observable.of(
          createAction(KitModelsActions.UPDATE_FAIL, err),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE)
        ));
    });

  /**
   * On unsuccessful operations, show message.
   */
  @Effect()
  errors$ = this.actions$
    .ofType(
      KitModelsActions.FETCH_FAIL,
      KitModelsActions.UPDATE_FAIL,
    )
    .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
    .delay(1);
}
