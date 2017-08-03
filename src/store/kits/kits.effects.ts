import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';

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
    public kitData: KitData,
    public app: App
  ) {}

  /**
   * Fetches kits.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(KitsActions.FETCH)
    .mergeMap(action => this.kitData.getKits()
      .map(res => createAction(KitsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(createAction(KitsActions.FETCH_FAIL, err)))
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
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(KitsActions.DELETE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Pops nav twice on successful delete to pop edit kit page and view kit page
   * since kit doesn't exist anymore.
   */
  @Effect()
  deleteSuccess$ = this.actions$
    .ofType(KitsActions.DELETE_SUCCESS)
    .mergeMap(() => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, Messages.kitDeleted),
      createAction(AppActions.POP_NAV_TWICE)
    ))
    .delay(1);

  /**
   * Creates a kit.
   */
  @Effect()
  create$ = this.actions$
    .ofType(KitsActions.CREATE)
    .mergeMap(action => this.kitData.addKit(action.payload.kit)
      .map(res => createAction(KitsActions.CREATE_SUCCESS, {
        kit: res,
        kitModelsToCreate: action.payload.kitModels,
        kitModelsToDelete: [],
        message: Messages.kitAdded
      }))
      .catch(err => Observable.of(createAction(KitsActions.CREATE_FAIL, err)))
    );

  /**
   * On successful kit creation, create the kit models.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(KitsActions.UPDATE_SUCCESS, KitsActions.CREATE_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(KitModelsActions.UPDATE, action.payload)
    ))
    .delay(1);

  /**
   * Updates a kit.
   */
  @Effect()
  update$ = this.actions$
    .ofType(KitsActions.UPDATE)
    .mergeMap(action => this.kitData.updateKit(action.payload.kit)
      .map(res => createAction(KitsActions.UPDATE_SUCCESS, {
        kit: res,
        kitModelsToCreate: action.payload.kitModelsToCreate,
        kitModelsToDelete: action.payload.kitModelsToDelete,
        message: Messages.kitEdited
      }))
      .catch(err => Observable.of(createAction(KitsActions.UPDATE_FAIL, err)))
    );

  /**
   * On unsuccessful operations, show message.
   */
  @Effect()
  errors$ = this.actions$
    .ofType(
      KitsActions.FETCH_FAIL,
      KitsActions.DELETE_FAIL,
      KitsActions.CREATE_FAIL,
      KitsActions.UPDATE_FAIL
    )
    .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
    .delay(1);
}
