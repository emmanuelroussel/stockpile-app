import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class CategoriesActions {

  static FETCH = type('[Categories] Fetch');
  static FETCH_SUCCESS = type('[Categories] Fetch Success');
  static FETCH_FAIL = type('[Categories] Fetch Fail');

  static CREATE = type('[Categories] Create');
  static CREATE_SUCCESS = type('[Categories] Create Success');
  static CREATE_FAIL = type('[Categories] Create Fail');

  static UPDATE = type('[Categories] Update');
  static UPDATE_SUCCESS = type('[Categories] Update Success');
  static UPDATE_FAIL = type('[Categories] Update Fail');

  static DELETE = type('[Categories] Delete');
  static DELETE_SUCCESS = type('[Categories] Delete Success');
  static DELETE_FAIL = type('[Categories] Delete Fail');

  static FILTER = type('[Categories] Filter');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchCategories() {
    this.store.dispatch(createAction(CategoriesActions.FETCH));
  }

  // pop determines whether the nav should poped after the category is created.
  createCategory(name: string, pop: boolean = false) {
    this.store.dispatch(createAction(CategoriesActions.CREATE, { name, pop }));
  }

  updateCategory(category: any) {
    this.store.dispatch(createAction(CategoriesActions.UPDATE, category));
  }

  deleteCategory(categoryID: number) {
    this.store.dispatch(createAction(CategoriesActions.DELETE, categoryID));
  }

  filterCategories(text: string) {
    this.store.dispatch(createAction(CategoriesActions.FILTER, text));
  }
}
