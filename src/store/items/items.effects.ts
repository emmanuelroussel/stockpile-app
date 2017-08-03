import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../models/app-state';
// Importing constants with alias to avoid naming conflict with ngrx's Actions
import * as constants from '../../constants';
import { RentalPage } from '../../pages/rental/rental';

import { createAction } from '../create-action';
import { ItemsActions } from './items.actions.ts';
import { AppActions } from '../app/app.actions.ts';
import { ItemData } from '../../providers/item-data';
import { paginationLimit, Messages } from '../../constants';
import { LayoutActions } from '../layout/layout.actions';

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
        action.payload.brandID,
        action.payload.modelID,
        action.payload.categoryID,
        action.payload.available,
        paginationLimit,
        store.items.offset
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
    .mergeMap(action => this.itemData.addItem(action.payload)
      .concatMap(res => [
        createAction(ItemsActions.CREATE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.itemAdded),
        createAction(AppActions.POP_NAV)
      ])
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
    .mergeMap(action => this.itemData.editItem(action.payload, action.payload.barcode)
      .concatMap(res => [
        createAction(ItemsActions.UPDATE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.itemEdited),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(ItemsActions.UPDATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Deletes an item.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(ItemsActions.DELETE)
    .mergeMap(action => this.itemData.deleteItem(action.payload)
      .concatMap(res => [
        createAction(ItemsActions.DELETE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.itemDeleted),
        createAction(AppActions.POP_NAV_TWICE)
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
            action: action.payload.available ? constants.Actions.rent : constants.Actions.return
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
            createAction(ItemsActions.ADD_TO_RENTALS_FAIL, { message: Messages.itemAlreadyRented }),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE)
          ];
        } else if (res.available && action.payload.action === constants.Actions.return) {
          return [
            createAction(ItemsActions.ADD_TO_RENTALS_FAIL, { message: Messages.itemNotRented }),
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
                this.itemData.return(rental.rentalID, action.payload).subscribe(
                  res => resolve(),
                  err => reject(err)
                );
              },
              err => reject(err)
            );
          })
        );
      }

      return Observable.of(Promise.all(returns))
        .concatMap(() => [
          createAction(ItemsActions.RETURN_SUCCESS),
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
      let rentals = [];
      const items = Object.keys(store.items.rentals).map((key) => store.items.rentals[key]);

      for (const item of items) {
        const rental = { ...action.payload, barcode: item.barcode };
        rentals.push(this.itemData.rent(rental).toPromise());
      }

      return Observable.of(Promise.all(rentals))
        .concatMap(() => [
          createAction(ItemsActions.RENT_SUCCESS),
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
}
