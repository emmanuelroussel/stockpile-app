import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AppState } from '../../models';
// Importing constants with alias to avoid naming conflict with ngrx's Actions
import * as constants from '../../constants';
import { RentalPage } from '../../pages/rental/rental';

import { createAction } from '../create-action';
import { ItemsActions } from './items.actions';
import { AppActions } from '../app/app.actions';
import { ItemData } from '../../providers/item-data';
import { Messages } from '../../constants';
import { LayoutActions } from '../layout/layout.actions';
import { ItemPage } from '../../pages/item/item';

@Injectable()
export class ItemsEffects {
  constructor(
    public actions$: Actions,
    public itemData: ItemData,
    public store$: Store<AppState>
  ) {}

  /**
   * Fetches items.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(ItemsActions.FETCH)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.itemData.filterItems(
        store.items.filters.brandID,
        store.items.filters.modelID,
        store.items.filters.categoryID,
        store.items.filters.available,
        store.items.filters.search
      )
      .map(res => createAction(ItemsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(ItemsActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates an item.
   */
  @Effect()
  create$ = this.actions$
    .ofType(ItemsActions.CREATE)
    .mergeMap(action => this.itemData.createItem(action.payload.item)
      .map(res => createAction(ItemsActions.UPDATE_ITEM_CUSTOM_FIELDS, {
        item: res,
        itemCustomFields: action.payload.itemCustomFields,
        success: ItemsActions.CREATE_SUCCESS,
        fail: ItemsActions.CREATE_FAIL
      }))
      .catch(err => Observable.of(
        createAction(ItemsActions.CREATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Updates an item.
   */
  @Effect()
  update$ = this.actions$
    .ofType(ItemsActions.UPDATE)
    .mergeMap(action => this.itemData.updateItem(action.payload.item, action.payload.item.barcode)
      .map(res => createAction(ItemsActions.UPDATE_ITEM_CUSTOM_FIELDS, {
        item: res,
        itemCustomFields: action.payload.itemCustomFields,
        success: ItemsActions.UPDATE_SUCCESS,
        fail: ItemsActions.UPDATE_FAIL
      }))
      .catch(err => Observable.of(
        createAction(ItemsActions.UPDATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

    /**
     * Updates an item's custom fields.
     */
    @Effect()
    updateItemCustomFields$ = this.actions$
      .ofType(ItemsActions.UPDATE_ITEM_CUSTOM_FIELDS)
      .mergeMap(action => {
        let requests = [];

        action.payload.itemCustomFields.map(itemCustomField => {
          if (itemCustomField.shouldUpdate) {
            requests.push(this.itemData.updateItemCustomField(
              action.payload.item.barcode,
              itemCustomField.customFieldID,
              { value: itemCustomField.value }
            ).toPromise());
          }
        });

        return Observable.from(Promise.all(requests))
          .concatMap(res => [
            createAction(action.payload.success, action.payload.item),
            createAction(ItemsActions.FETCH),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE),
            createAction(AppActions.SHOW_MESSAGE, Messages.itemEdited),
            createAction(AppActions.POP_NAV)
          ])
          .catch(err => Observable.of(
            createAction(action.payload.fail, err),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE),
            createAction(AppActions.SHOW_MESSAGE, err.message)
          ));
      });

  /**
   * Deletes an item.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(ItemsActions.DELETE)
    .mergeMap(action => this.itemData.deleteItem(action.payload)
      .concatMap(res => [
        createAction(ItemsActions.DELETE_SUCCESS, res),
        createAction(ItemsActions.FETCH),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.itemDeleted),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(ItemsActions.DELETE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates a new rental.
   */
  @Effect()
  startRental$ = this.actions$
    .ofType(ItemsActions.START_RENTAL)
    .mergeMap(action => this.itemData.getItem(action.payload)
      .concatMap(res => [
        createAction(ItemsActions.START_RENTAL_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.PUSH_PAGE, {
          page: RentalPage,
          navParams: {
            action: res.available ? constants.Actions.rent : constants.Actions.return
          }
        })
      ])
      .catch(err => Observable.of(
        createAction(ItemsActions.START_RENTAL_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Adds an item to the rentals if valid.
   */
  @Effect()
  addToRentals$ = this.actions$
    .ofType(ItemsActions.ADD_TO_RENTALS)
    .mergeMap(action => this.itemData.getItem(action.payload.barcode)
      .concatMap(res => {
        if (!res.available && action.payload.action === constants.Actions.rent) {
          return [
            createAction(ItemsActions.ADD_TO_RENTALS_FAIL),
            createAction(AppActions.SHOW_MESSAGE, Messages.itemAlreadyRented),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE)
          ];
        } else if (res.available && action.payload.action === constants.Actions.return) {
          return [
            createAction(ItemsActions.ADD_TO_RENTALS_FAIL),
            createAction(AppActions.SHOW_MESSAGE, Messages.itemNotRented),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE)
          ];
        } else {
          return [
            createAction(ItemsActions.ADD_TO_RENTALS_SUCCESS, res),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE)
          ];
        }
      })
      .catch(err => Observable.of(
        createAction(ItemsActions.ADD_TO_RENTALS_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Returns items.
   */
  @Effect()
  return$ = this.actions$
    .ofType(ItemsActions.RETURN)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => {
      let returns = [];
      const items = Object.keys(store.items.rentals).map((key) => store.items.rentals[key]);

      // Get the rentalID of each item and then return it with today's date
      for (const item of items) {
        returns.push(
          new Promise((resolve, reject) => {
            this.itemData.getActiveRental(item.barcode).subscribe(
              rental => {
                this.itemData.return(rental.rentalID, item.barcode, action.payload).subscribe(
                  res => resolve(),
                  err => reject(err)
                );
              },
              err => reject(err)
            );
          })
        );
      }

      return Observable.from(Promise.all(returns))
        .concatMap(() => [
          createAction(ItemsActions.RETURN_SUCCESS),
          createAction(ItemsActions.FETCH),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.itemsReturned),
          createAction(AppActions.POP_NAV)
        ])
        .catch(err => Observable.of(
          createAction(ItemsActions.RETURN_FAIL, err),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, err.message)
        ));
    });

  /**
   * Rents items.
   */
  @Effect()
  rent$ = this.actions$
    .ofType(ItemsActions.RENT)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => {
      const items = Object.keys(store.items.rentals).map((key) => {
        return { barcode: store.items.rentals[key].barcode };
      });

      return this.itemData.rent({ ...action.payload, items })
        .concatMap(() => [
          createAction(ItemsActions.RENT_SUCCESS),
          createAction(ItemsActions.FETCH),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.itemsRented),
          createAction(AppActions.POP_NAV_TO_ROOT)
        ])
        .catch(err => Observable.of(
          createAction(ItemsActions.RENT_FAIL, err),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, err.message)
        ));
    });

  /**
   * Fetches item custom fields.
   */
  @Effect()
  fetchItemCustomFields$ = this.actions$
    .ofType(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS)
    .mergeMap(action => this.itemData.getItemCustomFields(action.payload)
      .map(res => createAction(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Fetches item custom fields by category.
   */
  @Effect()
  fetchItemCustomFieldsByCategory$ = this.actions$
    .ofType(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY)
    .mergeMap(action => this.itemData.getItemCustomFieldsByCategory(action.payload)
      .map(res => {
        let itemCustomFields = [];
        res.results.map(customField => itemCustomFields.push({ ...customField, value: null }));

        return createAction(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY_SUCCESS, {
          results: itemCustomFields
        });
      })
      .catch(err => Observable.of(
        createAction(ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Checks whether or not a user can create an item with a specific barcode.
   */
  @Effect()
  startCreate$ = this.actions$
    .ofType(ItemsActions.START_CREATE)
    .mergeMap(action => this.itemData.getItem(action.payload)
      // If we get an item, it means an item with the barcode already exists
      .map(() => createAction(AppActions.SHOW_MESSAGE, constants.Messages.itemAlreadyExists))
      .catch(err => {
        // Push the page if we receive a 404 (barcode doesn't exist)
        if (err.code === 'NotFound') {
          return Observable.of(
            createAction(AppActions.PUSH_PAGE, {
              page: ItemPage,
              navParams: {
                barcode: action.payload,
                action: constants.Actions.add
              }
            })
          );
        } else {
          return Observable.of(
            createAction(AppActions.SHOW_MESSAGE, err.message)
          );
        }
      })
    );
}
