import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class ItemsActions {

  static FETCH = type('[Items] Fetch');
  static FETCH_SUCCESS = type('[Items] Fetch Success');
  static FETCH_FAIL = type('[Items] Fetch Fail');

  static CREATE = type('[Items] Create');
  static CREATE_SUCCESS = type('[Items] Create Success');
  static CREATE_FAIL = type('[Items] Create Fail');

  static UPDATE = type('[Items] Update');
  static UPDATE_SUCCESS = type('[Items] Update Success');
  static UPDATE_FAIL = type('[Items] Update Fail');

  static DELETE = type('[Items] Delete');
  static DELETE_SUCCESS = type('[Items] Delete Success');
  static DELETE_FAIL = type('[Items] Delete Fail');

  static RESET = type('[Items] Reset');

  static UPDATE_TEMP = type('[Items] Update Temp');

  static RESET_RENTALS = type('[Items] Reset Rentals');
  static REMOVE_FROM_RENTALS = type('[Items] Remove From Rentals');

  static ADD_TO_RENTALS = type('[Items] Add To Rentals');
  static ADD_TO_RENTALS_SUCCESS = type('[Items] Add to Rentals Success');
  static ADD_TO_RENTALS_FAIL = type('[Items] Add to Rentals Fail');

  static START_RENTAL = type('[Items] Start Rental');
  static START_RENTAL_SUCCESS = type('[Items] Start Rental Success');
  static START_RENTAL_FAIL = type('[Items] Start Rental Fail');

  static RETURN = type('[Items] Return');
  static RETURN_SUCCESS = type('[Items] Return Success');
  static RETURN_FAIL = type('[Items] Return Fail');

  static RENT = type('[Items] Rent');
  static RENT_SUCCESS = type('[Items] Rent Success');
  static RENT_FAIL = type('[Items] Rent Fail');

  static RESET_TEMP_ITEM = type('[Items] Reset Temp');
  static RESET_TEMP_ITEM_CUSTOM_FIELDS = type('[Items] Reset Temp Item Custom Fields');

  static FETCH_ITEM_CUSTOM_FIELDS = type('[Items] Fetch Item Custom Fields');
  static FETCH_ITEM_CUSTOM_FIELDS_SUCCESS = type('[Items] Fetch Item Custom Fields Success');
  static FETCH_ITEM_CUSTOM_FIELDS_FAIL = type('[Items] Fetch Item Custom Fields Fail');

  static FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY = type('[Items] Fetch Item Custom Fields By Category');
  static FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY_SUCCESS = type('[Items] Fetch Item Custom Fields Success By Category');
  static FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY_FAIL = type('[Items] Fetch Item Custom Fields Fail By Category');

  static UPDATE_ITEM_CUSTOM_FIELDS = type('[Items] Update Item Custom Fields');
  static UPDATE_ITEM_CUSTOM_FIELDS_SUCCESS = type('[Items] Update Item Custom Fields Success');
  static UPDATE_ITEM_CUSTOM_FIELDS_FAIL = type('[Items] Update Item Custom Fields Fail');

  static START_CREATE = type('[Items] Start Create');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchItems(brandID?: number, modelID?: number, categoryID?: number, available?: number) {
    this.store.dispatch(createAction(ItemsActions.FETCH, { brandID, modelID, categoryID, available }));
  }

  createItem(item: any, itemCustomFields: Array<any>) {
    this.store.dispatch(createAction(ItemsActions.CREATE, { item, itemCustomFields }));
  }

  updateItem(item: any, itemCustomFields: Array<any>) {
    this.store.dispatch(createAction(ItemsActions.UPDATE, { item, itemCustomFields }));
  }

  deleteItem(barcode: string) {
    this.store.dispatch(createAction(ItemsActions.DELETE, barcode));
  }

  resetItems() {
    this.store.dispatch(createAction(ItemsActions.RESET));
  }

  updateTempItem(item: any) {
    this.store.dispatch(createAction(ItemsActions.UPDATE_TEMP, item));
  }

  addToRentals(barcode: string, action: string) {
    this.store.dispatch(createAction(ItemsActions.ADD_TO_RENTALS, { barcode, action }));
  }

  resetRentals() {
    this.store.dispatch(createAction(ItemsActions.RESET_RENTALS));
  }

  startRental(barcode: string) {
    this.store.dispatch(createAction(ItemsActions.START_RENTAL, barcode));
  }

  removeFromRentals(barcode: string) {
    this.store.dispatch(createAction(ItemsActions.REMOVE_FROM_RENTALS, barcode));
  }

  returnItems(returnDate: string) {
    this.store.dispatch(createAction(ItemsActions.RETURN, returnDate));
  }

  rentItems(details: any) {
    this.store.dispatch(createAction(ItemsActions.RENT, details));
  }

  resetTempItem() {
    this.store.dispatch(createAction(ItemsActions.RESET_TEMP_ITEM));
  }

  resetTempItemCustomFields() {
    this.store.dispatch(createAction(ItemsActions.RESET_TEMP_ITEM_CUSTOM_FIELDS));
  }

  fetchItemCustomFields(barcode: string) {
    this.store.dispatch(createAction(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS, barcode));
  }

  fetchItemCustomFieldsByCategory(categoryID: number) {
    this.store.dispatch(createAction(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY, categoryID));
  }

  startCreate(barcode: string) {
    this.store.dispatch(createAction(ItemsActions.START_CREATE, barcode));
  }
}
