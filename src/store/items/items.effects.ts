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
    .ofType(ItemsActions.FETCH_ITEMS)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.itemData.filterItems(
        action.payload.brandID,
        action.payload.modelID,
        action.payload.categoryID,
        action.payload.available,
        paginationLimit,
        store.items.offset
      )
      .map(res => createAction(ItemsActions.FETCH_ITEMS_SUCCESS, res))
      .catch(err => Observable.of(createAction(ItemsActions.FETCH_ITEMS_ERROR, err)))
    );

  /**
   * Creates an item.
   */
  @Effect()
  create$ = this.actions$
    .ofType(ItemsActions.CREATE_ITEM)
    .mergeMap(action => this.itemData.addItem(action.payload)
      .map(res => createAction(ItemsActions.CREATE_ITEM_SUCCESS, res))
      .catch(err => Observable.of(createAction(ItemsActions.CREATE_ITEM_ERROR, err)))
    );

  /**
   * Updates an item.
   */
  @Effect()
  update$ = this.actions$
    .ofType(ItemsActions.UPDATE_ITEM)
    .mergeMap(action => this.itemData.editItem(action.payload, action.payload.barcode)
      .map(res => createAction(ItemsActions.UPDATE_ITEM_SUCCESS, res))
      .catch(err => Observable.of(createAction(ItemsActions.UPDATE_ITEM_ERROR, err)))
    );

  /**
   * Deletes an item.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(ItemsActions.DELETE_ITEM)
    .mergeMap(action => this.itemData.deleteItem(action.payload)
      .map(res => createAction(ItemsActions.DELETE_ITEM_SUCCESS, res))
      .catch(err => Observable.of(createAction(ItemsActions.DELETE_ITEM_ERROR, err)))
    );

  /**
   * Creates a new rental.
   */
  @Effect()
  startRental$ = this.actions$
    .ofType(ItemsActions.START_RENTAL)
    .mergeMap(action => this.itemData.getItem(action.payload)
      .map(res => createAction(ItemsActions.START_RENTAL_SUCCESS, res))
      .catch(err => Observable.of(createAction(ItemsActions.START_RENTAL_ERROR, err)))
    );

  /**
   * On successful rental start, push Rental page with the right action.
   */
  @Effect()
  startRentalSuccess$ = this.actions$
    .ofType(ItemsActions.START_RENTAL_SUCCESS)
    .mergeMap(action => Observable.of(createAction(AppActions.PUSH_PAGE, {
      page: RentalPage,
      navParams: {
        action: action.payload.available ? constants.Actions.rent : constants.Actions.return
      }
    })))
    .delay(1);

  /**
   * Adds an item to the rentals if valid.
   */
  @Effect()
  addToRentals$ = this.actions$
    .ofType(ItemsActions.ADD_TO_RENTALS)
    .mergeMap(action => this.itemData.getItem(action.payload.barcode)
      .map(res => {
        if (!res.available && action.payload.action === constants.Actions.rent) {
          return createAction(ItemsActions.ADD_TO_RENTALS_ERROR, { message: Messages.itemAlreadyRented });
        } else if (res.available && action.payload.action === constants.Actions.return) {
          return createAction(ItemsActions.ADD_TO_RENTALS_ERROR, { message: Messages.itemNotRented });
        } else {
          return createAction(ItemsActions.ADD_TO_RENTALS_SUCCESS, res);
        }
      })
      .catch(err => Observable.of(createAction(ItemsActions.ADD_TO_RENTALS_ERROR, err)))
    );

  /**
   * On successful item creation, pop nav.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(ItemsActions.CREATE_ITEM_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, Messages.itemAdded),
      createAction(AppActions.POP_NAV)
    ))
    .delay(1);

  /**
   * On successful item update, pop nav.
   */
  @Effect()
  updateSuccess$ = this.actions$
    .ofType(ItemsActions.UPDATE_ITEM_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, Messages.itemEdited),
      createAction(AppActions.POP_NAV)
    ))
    .delay(1);

  /**
   * On successful item deletion, pop nav twice.
   */
  @Effect()
  deleteSuccess$ = this.actions$
    .ofType(ItemsActions.DELETE_ITEM_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, Messages.itemDeleted),
      createAction(AppActions.POP_NAV_TWICE)
    ))
    .delay(1);

  /**
   * Returns items.
   */
  @Effect()
  return$ = this.actions$
    .ofType(ItemsActions.RETURN_ITEMS)
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
        .map(() => createAction(ItemsActions.RETURN_ITEMS_SUCCESS))
        .catch(err => Observable.of(createAction(ItemsActions.RETURN_ITEMS_ERROR, err)));
    });

    /**
     * On successful return, pop nav.
     */
    @Effect()
    returnSuccess$ = this.actions$
      .ofType(ItemsActions.RETURN_ITEMS_SUCCESS)
      .mergeMap(action => Observable.of(
        createAction(AppActions.SHOW_MESSAGE, Messages.itemsReturned),
        createAction(AppActions.POP_NAV)
      ))
      .delay(1);

    /**
     * Rents items.
     */
    @Effect()
    rent$ = this.actions$
      .ofType(ItemsActions.RENT_ITEMS)
      .withLatestFrom(this.store$)
      .mergeMap(([action, store]) => {
        let rentals = [];
        const items = Object.keys(store.items.rentals).map((key) => store.items.rentals[key]);

        for (const item of items) {
          const rental = { ...action.payload, barcode: item.barcode };
          rentals.push(this.itemData.rent(rental).toPromise());
        }

        return Observable.of(Promise.all(rentals))
          .map(() => createAction(ItemsActions.RENT_ITEMS_SUCCESS))
          .catch(err => Observable.of(createAction(ItemsActions.RENT_ITEMS_ERROR, err)));
      });

      /**
       * On successful rent, pop nav to root.
       */
      @Effect()
      rentSuccess$ = this.actions$
        .ofType(ItemsActions.RENT_ITEMS_SUCCESS)
        .mergeMap(action => Observable.of(
          createAction(AppActions.SHOW_MESSAGE, Messages.itemsRented),
          createAction(AppActions.POP_NAV_TO_ROOT)
        ))
        .delay(1);

      /**
       * On unsuccessful operations, show message.
       */
      @Effect()
      errors$ = this.actions$
        .ofType(
          ItemsActions.FETCH_ITEMS_ERROR,
          ItemsActions.CREATE_ITEM_ERROR,
          ItemsActions.UPDATE_ITEM_ERROR,
          ItemsActions.DELETE_ITEM_ERROR,
          ItemsActions.START_RENTAL_ERROR,
          ItemsActions.ADD_TO_RENTALS_ERROR,
          ItemsActions.RETURN_ITEMS_ERROR,
          ItemsActions.RENT_ITEMS_ERROR
        )
        .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
        .delay(1);
}
