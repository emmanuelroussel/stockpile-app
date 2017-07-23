import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class CategoriesActions {

  static FETCH_CATEGORIES = 'FETCH_CATEGORIES';
  static FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
  static FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

  static CREATE_CATEGORY = 'CREATE_CATEGORY';
  static CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
  static CREATE_CATEGORY_ERROR = 'CREATE_CATEGORY_ERROR';

  static FILTER_CATEGORIES = 'FILTER_CATEGORIES';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchCategories() {
    this.store.dispatch(createAction(CategoriesActions.FETCH_CATEGORIES));
  }

  createCategory(name: string) {
    this.store.dispatch(createAction(CategoriesActions.CREATE_CATEGORY, { name }));
  }

  filterCategories(text: string) {
    this.store.dispatch(createAction(CategoriesActions.FILTER_CATEGORIES, text));
  }
}
