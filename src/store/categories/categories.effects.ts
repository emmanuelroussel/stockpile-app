import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';

import { createAction } from '../create-action';
import { CategoriesActions } from './categories.actions';
import { AppActions } from '../app/app.actions.ts';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    public actions$: Actions,
    public itemPropertyData: ItemPropertyData,
    public app: App
  ) {}

  /**
   * Fetches categories.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(CategoriesActions.FETCH_CATEGORIES)
    .mergeMap(action => this.itemPropertyData.getCategories()
      .map(res => createAction(CategoriesActions.FETCH_CATEGORIES_SUCCESS, res))
      .catch(err => Observable.of(createAction(CategoriesActions.FETCH_CATEGORIES_ERROR, err)))
    );

  /**
   * Creates a category.
   */
  @Effect()
  create$ = this.actions$
    .ofType(CategoriesActions.CREATE_CATEGORY)
    .mergeMap(action => this.itemPropertyData.addCategory(action.payload)
      .concatMap(res => [
        createAction(CategoriesActions.CREATE_CATEGORY_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(CategoriesActions.CREATE_CATEGORY_ERROR, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * On successful category creation, pop nav.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(CategoriesActions.CREATE_CATEGORY_SUCCESS)
    .mergeMap(action => Observable.of(AppActions.POP_NAV))
    .delay(1);

  /**
   * On unsuccessful operations, show message.
   */
  @Effect()
  errors$ = this.actions$
    .ofType(
      CategoriesActions.FETCH_CATEGORIES_ERROR,
      CategoriesActions.CREATE_CATEGORY_ERROR,
    )
    .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
    .delay(1);
}
