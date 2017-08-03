import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class BrandsActions {

  static FETCH = '[Brands] Fetch';
  static FETCH_SUCCESS = '[Brands] Fetch Success';
  static FETCH_FAIL = '[Brands] Fetch Fail';

  static CREATE = '[Brands] Create';
  static CREATE_SUCCESS = '[Brands] Create Success';
  static CREATE_FAIL = '[Brands] Create Fail';

  static FILTER = '[Brands] Filter';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchBrands() {
    this.store.dispatch(createAction(BrandsActions.FETCH));
  }

  createBrand(name: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingBrand));
    this.store.dispatch(createAction(BrandsActions.CREATE, { name }));
  }

  filterBrands(text: string) {
    this.store.dispatch(createAction(BrandsActions.FILTER, text));
  }
}
