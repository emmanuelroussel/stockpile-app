import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';

import { createAction } from '../create-action';
import { CategoriesActions } from './categories.actions';
import { AppActions } from '../app/app.actions.ts';
import { ItemPropertyData } from '../../providers/item-property-data';

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
      .map(res => createAction(CategoriesActions.CREATE_CATEGORY_SUCCESS, res))
      .catch(err => Observable.of(createAction(CategoriesActions.CREATE_CATEGORY_ERROR, err)))
    );

  /**
   * On successful category creation, pop nav.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(CategoriesActions.CREATE_CATEGORY_SUCCESS)
    .mergeMap(action => Observable.of(AppActions.POP_NAV))
    .delay(1);
}
