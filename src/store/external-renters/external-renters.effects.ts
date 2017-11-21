import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { createAction } from '../create-action';
import { ExternalRentersActions } from './external-renters.actions';
import { AppActions } from '../app/app.actions';
import { ExternalRenterData } from '../../providers/external-renter-data';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

@Injectable()
export class ExternalRentersEffects {
  constructor(
    public actions$: Actions,
    public externalRenterData: ExternalRenterData
  ) {}

  /**
   * Fetches external renters.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(ExternalRentersActions.FETCH)
    .mergeMap(action => this.externalRenterData.getExternalRenters()
      .map(res => createAction(ExternalRentersActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(ExternalRentersActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates external renter.
   */
  @Effect()
  create$ = this.actions$
    .ofType(ExternalRentersActions.CREATE)
    .mergeMap(action => this.externalRenterData.createExternalRenter(action.payload.externalRenter)
      .concatMap(res => {
        let success = [
          createAction(ExternalRentersActions.CREATE_SUCCESS, res),
          createAction(ExternalRentersActions.FETCH),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.externalRenterAdded),
        ];

        if (action.payload.pop) {
          success.push(createAction(AppActions.POP_NAV));
        }

        return success;
      })
      .catch(err => Observable.of(
        createAction(ExternalRentersActions.CREATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Updates external renter.
   */
  @Effect()
  update$ = this.actions$
    .ofType(ExternalRentersActions.UPDATE)
    .mergeMap(action => this.externalRenterData.updateExternalRenter(action.payload, action.payload.externalRenterID)
      .concatMap(res => [
        createAction(ExternalRentersActions.UPDATE_SUCCESS, res),
        createAction(ExternalRentersActions.FETCH),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.externalRenterEdited),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(ExternalRentersActions.UPDATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Deletes external renter.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(ExternalRentersActions.DELETE)
    .mergeMap(action => this.externalRenterData.deleteExternalRenter(action.payload)
      .concatMap(res => [
        createAction(ExternalRentersActions.DELETE_SUCCESS, res),
        createAction(ExternalRentersActions.FETCH),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.externalRenterDeleted),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(ExternalRentersActions.DELETE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );
}
