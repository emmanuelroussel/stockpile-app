import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { ItemData } from '../../providers/item-data';
import { ItemDataMock, StoreMock } from '../../mocks';
import { Store } from '@ngrx/store';
import { Messages, Actions } from '../../constants';
import { RentalPage } from '../../pages/rental/rental';

import { ItemsEffects } from './items.effects';
import { ItemsActions } from './items.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';

let instance: ItemsEffects = null;
let runner: EffectsRunner = null;

describe('Items Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ItemsEffects,
      { provide: ItemData, useClass: ItemDataMock },
      { provide: Store, useClass: StoreMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, ItemsEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches items', () => {
    runner.queue(createAction(ItemsActions.FETCH, {
      brandID: TestData.item.brandID,
      modelID: TestData.item.modelID,
      categoryID: TestData.item.categoryID,
      available: true
    }));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(ItemsActions.FETCH_SUCCESS, TestData.items)),
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.itemData.resolve = false;

    runner.queue(createAction(ItemsActions.FETCH, {
      brandID: TestData.item.brandID,
      modelID: TestData.item.modelID,
      categoryID: TestData.item.categoryID,
      available: true
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates an item', () => {
    runner.queue(createAction(ItemsActions.CREATE));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.CREATE_SUCCESS, TestData.apiItem),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.itemAdded),
      createAction(AppActions.POP_NAV)
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if create fails', () => {
    instance.itemData.resolve = false;

    runner.queue(createAction(ItemsActions.CREATE));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.CREATE_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('updates an item', () => {
    runner.queue(createAction(ItemsActions.UPDATE, TestData.apiItem));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.UPDATE_SUCCESS, TestData.apiItem),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.itemEdited),
      createAction(AppActions.POP_NAV)
    ];

    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if update fails', () => {
    instance.itemData.resolve = false;

    runner.queue(createAction(ItemsActions.UPDATE, TestData.item));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.UPDATE_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('deletes an item', () => {
    runner.queue(createAction(ItemsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.DELETE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.itemDeleted),
      createAction(AppActions.POP_NAV)
    ];

    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if delete fails', () => {
    instance.itemData.resolve = false;

    runner.queue(createAction(ItemsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.DELETE_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('starts a rental with rent', () => {
    instance.itemData.item = TestData.apiItem;
    runner.queue(createAction(ItemsActions.START_RENTAL, TestData.barcode));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.START_RENTAL_SUCCESS, TestData.apiItem),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.PUSH_PAGE, {
        page: RentalPage,
        navParams: {
          action: Actions.rent
        }
      })
    ];

    instance.startRental$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('starts a rental with return', () => {
    instance.itemData.item = TestData.rentedApiItem;
    runner.queue(createAction(ItemsActions.START_RENTAL, TestData.barcode));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.START_RENTAL_SUCCESS, TestData.rentedApiItem),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.PUSH_PAGE, {
        page: RentalPage,
        navParams: {
          action: Actions.return
        }
      })
    ];

    instance.startRental$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if start rental fails', () => {
    instance.itemData.resolve = false;

    runner.queue(createAction(ItemsActions.START_RENTAL, TestData.apiItem));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.START_RENTAL_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.startRental$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('adds item to rental', () => {
    instance.itemData.item = TestData.apiItem;
    runner.queue(createAction(ItemsActions.ADD_TO_RENTALS, {
      barcode: TestData.barcode,
      action: Actions.rent
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.ADD_TO_RENTALS_SUCCESS, TestData.apiItem),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];

    instance.addToRentals$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('does not add item to rentals if it is already rented', () => {
    instance.itemData.item = TestData.rentedApiItem;
    runner.queue(createAction(ItemsActions.ADD_TO_RENTALS, {
      barcode: TestData.barcode,
      action: Actions.rent
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.ADD_TO_RENTALS_FAIL),
      createAction(AppActions.SHOW_MESSAGE, Messages.itemAlreadyRented),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];

    instance.addToRentals$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('does not add item to rentals if it is not rented', () => {
    instance.itemData.item = TestData.apiItem;
    runner.queue(createAction(ItemsActions.ADD_TO_RENTALS, {
      barcode: TestData.barcode,
      action: Actions.return
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.ADD_TO_RENTALS_FAIL),
      createAction(AppActions.SHOW_MESSAGE, Messages.itemNotRented),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];

    instance.addToRentals$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if add to rental fails', () => {
    instance.itemData.resolve = false;

    runner.queue(createAction(ItemsActions.ADD_TO_RENTALS, TestData.apiItem));

    let performedActions = [];
    const expectedResult = [
      createAction(ItemsActions.ADD_TO_RENTALS_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.addToRentals$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });
});
