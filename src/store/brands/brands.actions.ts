import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class BrandsActions {

  static FETCH = type('[Brands] Fetch');
  static FETCH_SUCCESS = type('[Brands] Fetch Success');
  static FETCH_FAIL = type('[Brands] Fetch Fail');

  static CREATE = type('[Brands] Create');
  static CREATE_SUCCESS = type('[Brands] Create Success');
  static CREATE_FAIL = type('[Brands] Create Fail');

  static FILTER = type('[Brands] Filter');

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
