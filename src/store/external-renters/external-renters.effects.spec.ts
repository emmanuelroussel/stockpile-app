import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { ExternalRenterData } from '../../providers/external-renter-data';
import { ExternalRenterDataMock } from '../../mocks';

import { ExternalRentersEffects } from './external-renters.effects';
import { ExternalRentersActions } from './external-renters.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

let instance: ExternalRentersEffects = null;
let runner: EffectsRunner = null;

describe('ExternalRenters Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ExternalRentersEffects,
      { provide: ExternalRenterData, useClass: ExternalRenterDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, ExternalRentersEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches external renters', () => {
    instance.externalRenterData.externalRenters = TestData.externalRenters;

    runner.queue(createAction(ExternalRentersActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(ExternalRentersActions.FETCH_SUCCESS, TestData.externalRenters))
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.externalRenterData.resolve = false;

    runner.queue(createAction(ExternalRentersActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates an external renter', () => {
    runner.queue(createAction(ExternalRentersActions.CREATE, {
      name: TestData.externalRenter.name,
      pop: false
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.externalRenterAdded),
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates an external renter and pops nav', () => {
    runner.queue(createAction(ExternalRentersActions.CREATE, {
      name: TestData.externalRenter.name,
      pop: true
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.CREATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.externalRenterAdded),
      createAction(AppActions.POP_NAV)
    ];

    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if create fails', () => {
    instance.externalRenterData.resolve = false;

    runner.queue(createAction(ExternalRentersActions.CREATE, {
      name: TestData.externalRenter.name,
      pop: true
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.CREATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('updates an external renter', () => {
    runner.queue(createAction(ExternalRentersActions.UPDATE, TestData.externalRenter));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.UPDATE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.externalRenterEdited),
      createAction(AppActions.POP_NAV)
    ];

    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if update fails', () => {
    instance.externalRenterData.resolve = false;

    runner.queue(createAction(ExternalRentersActions.UPDATE, TestData.externalRenter));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.UPDATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('deletes an external renter', () => {
    runner.queue(createAction(ExternalRentersActions.DELETE, TestData.externalRenter.externalRenterID));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.DELETE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.externalRenterDeleted),
      createAction(AppActions.POP_NAV)
    ];

    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if delete fails', () => {
    instance.externalRenterData.resolve = false;

    runner.queue(createAction(ExternalRentersActions.DELETE, TestData.externalRenter.externalRenterID));

    let performedActions = [];
    const expectedResult = [
      createAction(ExternalRentersActions.DELETE_FAIL, TestData.error),
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
