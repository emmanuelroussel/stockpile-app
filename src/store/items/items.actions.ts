import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class ItemsActions {

  static FETCH = '[Items] Fetch';
  static FETCH_SUCCESS = '[Items] Fetch Success';
  static FETCH_FAIL = '[Items] Fetch Fail';

  static CREATE = '[Items] Create';
  static CREATE_SUCCESS = '[Items] Create Success';
  static CREATE_FAIL = '[Items] Create Fail';

  static UPDATE = '[Items] Update';
  static UPDATE_SUCCESS = '[Items] Update Success';
  static UPDATE_FAIL = '[Items] Update Fail';

  static DELETE = '[Items] Delete';
  static DELETE_SUCCESS = '[Items] Delete Success';
  static DELETE_FAIL = '[Items] Delete Fail';

  static RESET = '[Items] Reset';

  static UPDATE_TEMP = '[Items] Update Temp';

  static RESET_RENTALS = '[Items] Reset Rentals';
  static REMOVE_FROM_RENTALS = '[Items] Remove From Rentals';

  static ADD_TO_RENTALS = '[Items] Add To Rentals';
  static ADD_TO_RENTALS_SUCCESS = '[Items] Add to Rentals Success';
  static ADD_TO_RENTALS_FAIL = '[Items] Add to Rentals Fail';

  static START_RENTAL = '[Items] Start Rental';
  static START_RENTAL_SUCCESS = '[Items] Start Rental Success';
  static START_RENTAL_FAIL = '[Items] Start Rental Fail';

  static RETURN = '[Items] Return';
  static RETURN_SUCCESS = '[Items] Return Success';
  static RETURN_FAIL = '[Items] Return Fail';

  static RENT = '[Items] Rent';
  static RENT_SUCCESS = '[Items] Rent Success';
  static RENT_FAIL = '[Items] Rent Fail';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchItems(brandID?: number, modelID?: number, categoryID?: number, available?: number) {
    this.store.dispatch(createAction(ItemsActions.FETCH, { brandID, modelID, categoryID, available }));
  }

  createItem(item: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingItem));
    this.store.dispatch(createAction(ItemsActions.CREATE, item));
  }

  updateItem(item: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.updatingItem));
    this.store.dispatch(createAction(ItemsActions.UPDATE, item));
  }

  deleteItem(barcode: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.deletingItem));
    this.store.dispatch(createAction(ItemsActions.DELETE, barcode));
  }

  resetItems() {
    this.store.dispatch(createAction(ItemsActions.RESET));
  }

  updateTempItem(item: any) {
    this.store.dispatch(createAction(ItemsActions.UPDATE_TEMP, item));
  }

  addToRentals(barcode: string, action: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.addingToRentals));
    this.store.dispatch(createAction(ItemsActions.ADD_TO_RENTALS, { barcode, action }));
  }

  resetRentals() {
    this.store.dispatch(createAction(ItemsActions.RESET_RENTALS));
  }

  startRental(barcode: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.startingRental));
    this.store.dispatch(createAction(ItemsActions.START_RENTAL, barcode));
  }

  removeFromRentals(barcode: string) {
    this.store.dispatch(createAction(ItemsActions.REMOVE_FROM_RENTALS, barcode));
  }

  returnItems(returnDate: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.returningItems));
    this.store.dispatch(createAction(ItemsActions.RETURN, returnDate));
  }

  rentItems(details: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.rentingItems));
    this.store.dispatch(createAction(ItemsActions.RENT, details));
  }
}
