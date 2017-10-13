import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models';

@Injectable()
export class BrandsActions {

  static FETCH = type('[Brands] Fetch');
  static FETCH_SUCCESS = type('[Brands] Fetch Success');
  static FETCH_FAIL = type('[Brands] Fetch Fail');

  static CREATE = type('[Brands] Create');
  static CREATE_SUCCESS = type('[Brands] Create Success');
  static CREATE_FAIL = type('[Brands] Create Fail');

  static UPDATE = type('[Brands] Update');
  static UPDATE_SUCCESS = type('[Brands] Update Success');
  static UPDATE_FAIL = type('[Brands] Update Fail');

  static DELETE = type('[Brands] Delete');
  static DELETE_SUCCESS = type('[Brands] Delete Success');
  static DELETE_FAIL = type('[Brands] Delete Fail');

  static FILTER = type('[Brands] Filter');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchBrands() {
    this.store.dispatch(createAction(BrandsActions.FETCH));
  }

  // pop determines whether the nav should poped after the brand is created.
  createBrand(name: string, pop: boolean = false) {
    this.store.dispatch(createAction(BrandsActions.CREATE, { name, pop }));
  }

  updateBrand(brand: any) {
    this.store.dispatch(createAction(BrandsActions.UPDATE, brand));
  }

  deleteBrand(brandID: number) {
    this.store.dispatch(createAction(BrandsActions.DELETE, brandID));
  }

  filterBrands(text: string) {
    this.store.dispatch(createAction(BrandsActions.FILTER, text));
  }
}
