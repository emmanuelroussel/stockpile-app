import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { ItemPropertyData } from '../../providers/item-property-data';
import { ItemPropertyDataMock } from '../../mocks';
import { Observable } from 'rxjs/Observable';

import { BrandsEffects } from './brands.effects';
import { BrandsActions } from './brands.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

let instance: BrandsEffects = null;
let runner: EffectsRunner = null;

describe('Brands Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      BrandsEffects,
      { provide: ItemPropertyData, useClass: ItemPropertyDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, BrandsEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches brands', () => {
    instance.itemPropertyData.brands = TestData.brands;

    runner.queue(createAction(BrandsActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(BrandsActions.FETCH_SUCCESS, TestData.brands))
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.itemPropertyData.resolve = false;

    runner.queue(createAction(BrandsActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a brand', () => {
    runner.queue(createAction(BrandsActions.CREATE, {
      name: TestData.brand.name,
      pop: false
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.brandAdded),
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a brand and pops nav', () => {
    runner.queue(createAction(BrandsActions.CREATE, {
      name: TestData.brand.name,
      pop: true
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.brandAdded),
      createAction(AppActions.POP_NAV)
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if create fails', () => {
    instance.itemPropertyData.resolve = false;

    runner.queue(createAction(BrandsActions.CREATE, {
      name: TestData.brand.name,
      pop: true
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.CREATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('updates a brand', () => {
    runner.queue(createAction(BrandsActions.UPDATE, TestData.brand));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.UPDATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.brandEdited),
      createAction(AppActions.POP_NAV)
    ];

    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if update fails', () => {
    instance.itemPropertyData.resolve = false;

    runner.queue(createAction(BrandsActions.UPDATE, TestData.brand));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.UPDATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('deletes a brand', () => {
    runner.queue(createAction(BrandsActions.DELETE, TestData.brand.brandID));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.DELETE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.brandDeleted),
      createAction(AppActions.POP_NAV)
    ];

    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if delete fails', () => {
    instance.itemPropertyData.resolve = false;

    runner.queue(createAction(BrandsActions.DELETE, TestData.brand.brandID));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.DELETE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });
});
