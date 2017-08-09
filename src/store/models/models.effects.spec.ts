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
    runner.queue(createAction(ModelsActions.CREATE));

    let performedActions = [];
    const expectedResult = [
      createAction(ModelsActions.CREATE_SUCCESS, TestData.response),
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

    runner.queue(createAction(ModelsActions.CREATE));

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
});
