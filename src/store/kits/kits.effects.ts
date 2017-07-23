import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';

import { createAction } from '../create-action';
import { KitsActions } from './kits.actions';
import { AppActions } from '../app/app.actions.ts';
import { KitData } from '../../providers/kit-data';
import { KitModelsActions } from '../kit-models/kit-models.actions';

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
    .ofType(KitsActions.FETCH_KITS)
    .mergeMap(action => this.kitData.getKits()
      .map(res => createAction(KitsActions.FETCH_KITS_SUCCESS, res))
      .catch(err => Observable.of(createAction(KitsActions.FETCH_KITS_ERROR, err)))
    );

  /**
   * Deletes a kit.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(KitsActions.DELETE_KIT)
    .mergeMap(action => this.kitData.deleteKit(action.payload)
      .map(res => createAction(KitsActions.DELETE_KIT_SUCCESS, res))
      .catch(err => Observable.of(createAction(KitsActions.DELETE_KIT_ERROR, err)))
    );

  /**
   * Pops nav twice on successful delete to pop edit kit page and view kit page
   * since kit doesn't exist anymore.
   */
  @Effect()
  deleteSuccess$ = this.actions$
    .ofType(KitsActions.DELETE_KIT_SUCCESS)
    .mergeMap(() => Observable.of(createAction(AppActions.POP_NAV_TWICE)))
    .delay(1);

  /**
   * Creates a kit.
   */
  @Effect()
  create$ = this.actions$
    .ofType(KitsActions.CREATE_KIT)
    .mergeMap(action => this.kitData.addKit(action.payload.kit)
      .map(res => createAction(KitsActions.CREATE_KIT_SUCCESS, {
        kit: res,
        kitModelsToCreate: action.payload.kitModels,
        kitModelsToDelete: []
      }))
      .catch(err => Observable.of(createAction(KitsActions.CREATE_KIT_ERROR, err)))
    );

  /**
   * On successful kit creation, create the kit models.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(KitsActions.CREATE_KIT_SUCCESS, KitsActions.UPDATE_KIT_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(KitModelsActions.UPDATE_KIT_MODELS, action.payload)
    ))
    .delay(1);

  /**
   * Updates a kit.
   */
  @Effect()
  update$ = this.actions$
    .ofType(KitsActions.UPDATE_KIT)
    .mergeMap(action => this.kitData.updateKit(action.payload.kit)
      .map(res => createAction(KitsActions.UPDATE_KIT_SUCCESS, {
        kit: res,
        kitModelsToCreate: action.payload.kitModelsToCreate,
        kitModelsToDelete: action.payload.kitModelsToDelete
      }))
      .catch(err => Observable.of(createAction(KitsActions.UPDATE_KIT_ERROR, err)))
    );
}
