import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { createAction } from '../create-action';
import { CustomFieldsActions } from './custom-fields.actions';
import { AppActions } from '../app/app.actions';
import { CustomFieldData } from '../../providers/custom-field-data';
import { CustomFieldCategoriesActions } from '../custom-field-categories/custom-field-categories.actions';
import { Messages } from '../../constants';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class CustomFieldsEffects {
  constructor(
    public actions$: Actions,
    public customFieldData: CustomFieldData
  ) {}

  /**
   * Fetches custom fields.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(CustomFieldsActions.FETCH)
    .mergeMap(action => this.customFieldData.getCustomFields()
      .map(res => createAction(CustomFieldsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(CustomFieldsActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Deletes a custom field.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(CustomFieldsActions.DELETE)
    .mergeMap(action => this.customFieldData.deleteCustomField(action.payload)
      .concatMap(res => [
        createAction(CustomFieldsActions.DELETE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.customFieldDeleted),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(CustomFieldsActions.DELETE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates a custom field.
   */
  @Effect()
  create$ = this.actions$
    .ofType(CustomFieldsActions.CREATE)
    .mergeMap(action => this.customFieldData.createCustomField(action.payload)
      .concatMap(res => [
        createAction(CustomFieldsActions.CREATE_SUCCESS, res),
        createAction(CustomFieldCategoriesActions.UPDATE, {
          customFieldID: res.customFieldID,
          message: Messages.customFieldAdded
        })
      ])
      .catch(err => Observable.of(
        createAction(CustomFieldsActions.CREATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Updates a custom field.
   */
  @Effect()
  update$ = this.actions$
    .ofType(CustomFieldsActions.UPDATE)
    .mergeMap(action => this.customFieldData.updateCustomField(action.payload)
      .concatMap(res => [
        createAction(CustomFieldsActions.UPDATE_SUCCESS, res),
        createAction(CustomFieldCategoriesActions.UPDATE, {
          customFieldID: res.customFieldID,
          message: Messages.customFieldEdited
        })
      ])
      .catch(err => Observable.of(
        createAction(CustomFieldsActions.UPDATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );
}
