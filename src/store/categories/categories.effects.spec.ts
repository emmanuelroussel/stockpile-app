import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { ItemPropertyData } from '../../providers/item-property-data';
import { ItemPropertyDataMock } from '../../mocks';

import { CategoriesEffects } from './categories.effects';
import { CategoriesActions } from './categories.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

let instance: CategoriesEffects = null;
let runner: EffectsRunner = null;

describe('Categories Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CategoriesEffects,
      { provide: ItemPropertyData, useClass: ItemPropertyDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, CategoriesEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches categories', () => {
    instance.itemPropertyData.categories = TestData.categories;

    runner.queue(createAction(CategoriesActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(CategoriesActions.FETCH_SUCCESS, TestData.categories))
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.itemPropertyData.resolve = false;

    runner.queue(createAction(CategoriesActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a category', () => {
    runner.queue(createAction(CategoriesActions.CREATE, {
      name: TestData.category.name,
      pop: false
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.categoryAdded),
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a category and pops nav', () => {
    runner.queue(createAction(CategoriesActions.CREATE, {
      name: TestData.category.name,
      pop: true
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.categoryAdded),
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

    runner.queue(createAction(CategoriesActions.CREATE, {
      name: TestData.category.name,
      pop: TestData.pop
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.CREATE_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('updates a category', () => {
    runner.queue(createAction(CategoriesActions.UPDATE, TestData.category));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.UPDATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.categoryEdited),
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

    runner.queue(createAction(CategoriesActions.UPDATE, TestData.category));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.UPDATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('deletes a category', () => {
    runner.queue(createAction(CategoriesActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.DELETE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.categoryDeleted),
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

    runner.queue(createAction(CategoriesActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(CategoriesActions.DELETE_FAIL, TestData.error),
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
