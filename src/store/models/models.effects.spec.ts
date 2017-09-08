import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { ItemPropertyData } from '../../providers/item-property-data';
import { ItemPropertyDataMock } from '../../mocks';
import { Observable } from 'rxjs/Observable';

import { ModelsEffects } from './models.effects';
import { ModelsActions } from './models.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

let instance: ModelsEffects = null;
let runner: EffectsRunner = null;

describe('Models Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ModelsEffects,
      { provide: ItemPropertyData, useClass: ItemPropertyDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, ModelsEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches models', () => {
    instance.itemPropertyData.models = TestData.models;

    runner.queue(createAction(ModelsActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(ModelsActions.FETCH_SUCCESS, TestData.models))
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.itemPropertyData.resolve = false;

    runner.queue(createAction(ModelsActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a model', () => {
    runner.queue(createAction(ModelsActions.CREATE, {
      model: TestData.model,
      pop: false
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.modelAdded),
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a model and pops nav', () => {
    runner.queue(createAction(ModelsActions.CREATE, {
      model: TestData.model,
      pop: true
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.modelAdded),
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

    runner.queue(createAction(ModelsActions.CREATE, {
      model: TestData.model,
      pop: TestData.pop
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.CREATE_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('updates a model', () => {
    runner.queue(createAction(ModelsActions.UPDATE, TestData.model));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.UPDATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.modelEdited),
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

    runner.queue(createAction(ModelsActions.UPDATE, TestData.model));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.UPDATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('deletes a model', () => {
    runner.queue(createAction(ModelsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.DELETE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.modelDeleted),
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

    runner.queue(createAction(ModelsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.DELETE_FAIL, TestData.error),
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
