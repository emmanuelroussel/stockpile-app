import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class ItemsActions {

  static FETCH_ITEMS = 'FETCH_ITEMS';
  static FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
  static FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';

  static CREATE_ITEM = 'CREATE_ITEM';
  static CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
  static CREATE_ITEM_ERROR = 'CREATE_ITEM_ERROR';

  static UPDATE_ITEM = 'UPDATE_ITEM';
  static UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
  static UPDATE_ITEM_ERROR = 'UPDATE_ITEM_ERROR';

  static DELETE_ITEM = 'DELETE_ITEM';
  static DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
  static DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';

  static RESET_ITEMS = 'RESET_ITEMS';

  static UPDATE_TEMP_ITEM = 'UPDATE_TEMP_ITEM';

  static RESET_RENTALS = 'RESET_RENTALS';
  static REMOVE_FROM_RENTALS = 'REMOVE_FROM_RENTALS';

  static ADD_TO_RENTALS = 'ADD_TO_RENTALS';
  static ADD_TO_RENTALS_SUCCESS = 'ADD_TO_RENTALS_SUCCESS';
  static ADD_TO_RENTALS_ERROR = 'ADD_TO_RENTALS_ERROR';

  static START_RENTAL = 'START_RENTAL';
  static START_RENTAL_SUCCESS = 'START_RENTAL_SUCCESS';
  static START_RENTAL_ERROR = 'START_RENTAL_ERROR';

  static RETURN_ITEMS = 'RETURN_ITEMS';
  static RETURN_ITEMS_SUCCESS = 'RETURN_ITEMS_SUCCESS';
  static RETURN_ITEMS_ERROR = 'RETURN_ITEMS_ERROR';

  static RENT_ITEMS = 'RENT_ITEMS';
  static RENT_ITEMS_SUCCESS = 'RENT_ITEMS_SUCCESS';
  static RENT_ITEMS_ERROR = 'RENT_ITEMS_ERROR';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchItems(brandID?: number, modelID?: number, categoryID?: number, available?: number) {
    this.store.dispatch(createAction(ItemsActions.FETCH_ITEMS, { brandID, modelID, categoryID, available }));
  }

  createItem(item: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingItem));
    this.store.dispatch(createAction(ItemsActions.CREATE_ITEM, item));
  }

  updateItem(item: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.updatingItem));
    this.store.dispatch(createAction(ItemsActions.UPDATE_ITEM, item));
  }

  deleteItem(barcode: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.deletingItem));
    this.store.dispatch(createAction(ItemsActions.DELETE_ITEM, barcode));
  }

  resetItems() {
    this.store.dispatch(createAction(ItemsActions.RESET_ITEMS));
  }

  updateTempItem(item: any) {
    this.store.dispatch(createAction(ItemsActions.UPDATE_TEMP_ITEM, item));
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
    this.store.dispatch(createAction(ItemsActions.RETURN_ITEMS, returnDate));
  }

  rentItems(details: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.rentingItems));
    this.store.dispatch(createAction(ItemsActions.RENT_ITEMS, details));
  }
}
