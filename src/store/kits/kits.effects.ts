import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { createAction } from '../create-action';
import { KitsActions } from './kits.actions';
import { AppActions } from '../app/app.actions.ts';
import { KitData } from '../../providers/kit-data';
import { KitModelsActions } from '../kit-models/kit-models.actions';
import { Messages } from '../../constants';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class KitsEffects {
  constructor(
    public actions$: Actions,
    public kitData: KitData
  ) {}

  /**
   * Fetches kits.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(KitsActions.FETCH)
    .mergeMap(action => this.kitData.getKits()
      .map(res => createAction(KitsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(KitsActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Deletes a kit.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(KitsActions.DELETE)
    .mergeMap(action => this.kitData.deleteKit(action.payload)
      .concatMap(res => [
        createAction(KitsActions.DELETE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.kitDeleted),
        createAction(AppActions.POP_NAV_TWICE)
      ])
      .catch(err => Observable.of(
        createAction(KitsActions.DELETE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates a kit.
   */
  @Effect()
  create$ = this.actions$
    .ofType(KitsActions.CREATE)
    .mergeMap(action => this.kitData.createKit(action.payload.kit)
      .concatMap(res => [
        createAction(KitsActions.CREATE_SUCCESS, res),
        createAction(KitModelsActions.UPDATE, {
          kitID: action.payload.kit.kitID,
          kitModelsToCreate: action.payload.kitModels,
          kitModelsToDelete: [],
          message: Messages.kitAdded
        })
      ])
      .catch(err => Observable.of(
        createAction(KitsActions.CREATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Updates a kit.
   */
  @Effect()
  update$ = this.actions$
    .ofType(KitsActions.UPDATE)
    .mergeMap(action => this.kitData.updateKit(action.payload.kit)
      .concatMap(res => [
        createAction(KitsActions.UPDATE_SUCCESS, res),
        createAction(KitModelsActions.UPDATE, {
          kitID: action.payload.kit.kitID,
          kitModelsToCreate: action.payload.kitModelsToCreate,
          kitModelsToDelete: action.payload.kitModelsToDelete,
          message: Messages.kitEdited
        })
      ])
      .catch(err => Observable.of(
        createAction(KitsActions.UPDATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );
}
