import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class BrandsActions {

  static FETCH_BRANDS = 'FETCH_BRANDS';
  static FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
  static FETCH_BRANDS_ERROR = 'FETCH_BRANDS_ERROR';

  static CREATE_BRAND = 'CREATE_BRAND';
  static CREATE_BRAND_SUCCESS = 'CREATE_BRAND_SUCCESS';
  static CREATE_BRAND_ERROR = 'CREATE_BRAND_ERROR';

  static FILTER_BRANDS = 'FILTER_BRANDS';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchBrands() {
    this.store.dispatch(createAction(BrandsActions.FETCH_BRANDS));
  }

  createBrand(name: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingBrand));
    this.store.dispatch(createAction(BrandsActions.CREATE_BRAND, { name }));
  }

  filterBrands(text: string) {
    this.store.dispatch(createAction(BrandsActions.FILTER_BRANDS, text));
  }
}
