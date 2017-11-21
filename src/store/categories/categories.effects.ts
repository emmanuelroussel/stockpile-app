import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { createAction } from '../create-action';
import { CategoriesActions } from './categories.actions';
import { AppActions } from '../app/app.actions';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

@Injectable()
export class CategoriesEffects {
  constructor(
    public actions$: Actions,
    public itemPropertyData: ItemPropertyData
  ) {}

  /**
   * Fetches categories.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(CategoriesActions.FETCH)
    .mergeMap(action => this.itemPropertyData.getCategories()
      .map(res => createAction(CategoriesActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(CategoriesActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates a category.
   */
  @Effect()
  create$ = this.actions$
    .ofType(CategoriesActions.CREATE)
    .mergeMap(action => this.itemPropertyData.createCategory({ name: action.payload.name })
      .concatMap(res => {
        let success = [
          createAction(CategoriesActions.CREATE_SUCCESS, res),
          createAction(CategoriesActions.FETCH),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.categoryAdded),
        ];

        if (action.payload.pop) {
          success.push(createAction(AppActions.POP_NAV));
        }

        return success;
      })
      .catch(err => Observable.of(
        createAction(CategoriesActions.CREATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

    /**
     * Updates category.
     */
    @Effect()
    update$ = this.actions$
      .ofType(CategoriesActions.UPDATE)
      .mergeMap(action => this.itemPropertyData.updateCategory(action.payload, action.payload.categoryID)
        .concatMap(res => [
          createAction(CategoriesActions.UPDATE_SUCCESS, res),
          createAction(CategoriesActions.FETCH),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.categoryEdited),
          createAction(AppActions.POP_NAV)
        ])
        .catch(err => Observable.of(
          createAction(CategoriesActions.UPDATE_FAIL, err),
          createAction(AppActions.SHOW_MESSAGE, err.message),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE)
        ))
      );

    /**
     * Deletes category.
     */
    @Effect()
    delete$ = this.actions$
      .ofType(CategoriesActions.DELETE)
      .mergeMap(action => this.itemPropertyData.deleteCategory(action.payload)
        .concatMap(res => [
          createAction(CategoriesActions.DELETE_SUCCESS, res),
          createAction(CategoriesActions.FETCH),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.categoryDeleted),
          createAction(AppActions.POP_NAV)
        ])
        .catch(err => Observable.of(
          createAction(CategoriesActions.DELETE_FAIL, err),
          createAction(AppActions.SHOW_MESSAGE, err.message),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE)
        ))
      );
}
