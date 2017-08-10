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
    runner.queue(createAction(BrandsActions.CREATE));

    let performedActions = [];
    const expectedResult = [
      createAction(BrandsActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if create fails', () => {
    instance.itemPropertyData.resolve = false;

    runner.queue(createAction(BrandsActions.CREATE));

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
});
