import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class CategoriesActions {

  static FETCH = '[Categories] Fetch';
  static FETCH_SUCCESS = '[Categories] Fetch Success';
  static FETCH_FAIL = '[Categories] Fetch Fail';

  static CREATE = '[Categories] Create';
  static CREATE_SUCCESS = '[Categories] Create Success';
  static CREATE_FAIL = '[Categories] Create Fail';

  static FILTER = '[Categories] Filter';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchCategories() {
    this.store.dispatch(createAction(CategoriesActions.FETCH));
  }

  createCategory(name: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingCategory));
    this.store.dispatch(createAction(CategoriesActions.CREATE, { name }));
  }

  filterCategories(text: string) {
    this.store.dispatch(createAction(CategoriesActions.FILTER, text));
  }
}
