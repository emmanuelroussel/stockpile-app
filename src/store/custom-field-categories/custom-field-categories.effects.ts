import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AppState } from '../../models/app-state';

import { createAction } from '../create-action';
import { CustomFieldCategoriesActions } from './custom-field-categories.actions';
import { CustomFieldData } from '../../providers/custom-field-data';
import { AppActions } from '../app/app.actions.ts';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class CustomFieldCategoriesEffects {
  constructor(
    public actions$: Actions,
    public customFieldData: CustomFieldData,
    public store$: Store<AppState>
  ) {}

  /**
   * Fetches custom field categories.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(CustomFieldCategoriesActions.FETCH)
    .mergeMap(action => this.customFieldData.getCategories(action.payload)
      .map(res => createAction(CustomFieldCategoriesActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(CustomFieldCategoriesActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Updates categories belonging to a specific custom field.
   */
  @Effect()
  update$ = this.actions$
    .ofType(CustomFieldCategoriesActions.UPDATE)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.customFieldData.updateCategories(
        action.payload.customFieldID,
        { categories: store.customFieldCategories.tempCustomFieldCategories }
      )
      .concatMap(res => [
        createAction(CustomFieldCategoriesActions.UPDATE_SUCCESS, {
          results: store.customFieldCategories.tempCustomFieldCategories,
          customFieldID: action.payload.customFieldID
        }),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, action.payload.message),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(CustomFieldCategoriesActions.UPDATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );
}
