import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class CategoriesActions {

  static FETCH = type('[Categories] Fetch');
  static FETCH_SUCCESS = type('[Categories] Fetch Success');
  static FETCH_FAIL = type('[Categories] Fetch Fail');

  static CREATE = type('[Categories] Create');
  static CREATE_SUCCESS = type('[Categories] Create Success');
  static CREATE_FAIL = type('[Categories] Create Fail');

  static FILTER = type('[Categories] Filter');

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
