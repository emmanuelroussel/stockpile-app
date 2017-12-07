import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { KitData } from '../../providers/kit-data';
import { KitDataMock } from '../../mocks';
import { Messages } from '../../constants';

import { KitsEffects } from './kits.effects';
import { KitsActions } from './kits.actions';
import { KitModelsActions } from '../kit-models/kit-models.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';

let instance: KitsEffects = null;
let runner: EffectsRunner = null;

describe('Kits Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      KitsEffects,
      { provide: KitData, useClass: KitDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, KitsEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches kits', () => {
    instance.kitData.kits = TestData.kits.results;

    runner.queue(createAction(KitsActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(KitsActions.FETCH_SUCCESS, TestData.kits.results)),
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.kitData.resolve = false;

    runner.queue(createAction(KitsActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(KitsActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('deletes a kit', () => {
    runner.queue(createAction(KitsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(KitsActions.DELETE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(KitsActions.FETCH),
      createAction(AppActions.SHOW_MESSAGE, Messages.kitDeleted),
      createAction(AppActions.POP_NAV)
    ];

    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if delete fails', () => {
    instance.kitData.resolve = false;

    runner.queue(createAction(KitsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(KitsActions.DELETE_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a kit', () => {
    runner.queue(createAction(KitsActions.CREATE, TestData.kit));

    let performedActions = [];
    const expectedResult = [
      createAction(KitsActions.CREATE_SUCCESS, TestData.kit),
      createAction(KitsActions.FETCH),
      createAction(KitModelsActions.UPDATE, {
        kitID: TestData.kit.kitID,
        message: Messages.kitAdded
      }),
      createAction(AppActions.POP_NAV)
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if create fails', () => {
    instance.kitData.resolve = false;

    runner.queue(createAction(KitsActions.CREATE, { kit: TestData.kit, kitModels: TestData.kitModels.results }));

    let performedActions = [];
    const expectedResult = [
      createAction(KitsActions.CREATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('updates a kit', () => {
    runner.queue(createAction(KitsActions.UPDATE, TestData.kit));

    let performedActions = [];
    const expectedResult = [
      createAction(KitsActions.UPDATE_SUCCESS, TestData.kit),
      createAction(KitsActions.FETCH),
      createAction(KitModelsActions.UPDATE, {
        kitID: TestData.kit.kitID,
        message: Messages.kitEdited
      })
    ];

    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if update fails', () => {
    instance.kitData.resolve = false;

    runner.queue(createAction(KitsActions.UPDATE, {
      kit: TestData.kit,
      kitModelsToCreate: TestData.kitModels.results,
      kitModelsToDelete: TestData.deletedKitModels.results
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(KitsActions.UPDATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });
});
