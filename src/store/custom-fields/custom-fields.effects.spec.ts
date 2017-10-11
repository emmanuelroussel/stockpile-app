import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { CustomFieldData } from '../../providers/custom-field-data';
import { CustomFieldDataMock } from '../../mocks';
import { Messages } from '../../constants';

import { CustomFieldsEffects } from './custom-fields.effects';
import { CustomFieldsActions } from './custom-fields.actions';
import { CustomFieldCategoriesActions } from '../custom-field-categories/custom-field-categories.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';

let instance: CustomFieldsEffects = null;
let runner: EffectsRunner = null;

describe('Custom Fields Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CustomFieldsEffects,
      { provide: CustomFieldData, useClass: CustomFieldDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, CustomFieldsEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches custom fields', () => {
    instance.customFieldData.customFields = TestData.customFields.results;

    runner.queue(createAction(CustomFieldsActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(CustomFieldsActions.FETCH_SUCCESS, TestData.customFields.results))
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.customFieldData.resolve = false;

    runner.queue(createAction(CustomFieldsActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldsActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('deletes a custom field', () => {
    runner.queue(createAction(CustomFieldsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldsActions.DELETE_SUCCESS, TestData.response),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, Messages.customFieldDeleted),
      createAction(AppActions.POP_NAV)
    ];

    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if delete fails', () => {
    instance.customFieldData.resolve = false;

    runner.queue(createAction(CustomFieldsActions.DELETE));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldsActions.DELETE_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.delete$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('creates a custom field', () => {
    runner.queue(createAction(CustomFieldsActions.CREATE, TestData.customField));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldsActions.CREATE_SUCCESS, TestData.customField),
      createAction(CustomFieldCategoriesActions.UPDATE, {
        customFieldID: TestData.customField.customFieldID,
        message: Messages.customFieldAdded
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
    instance.customFieldData.resolve = false;

    runner.queue(createAction(CustomFieldsActions.CREATE, {
      customField: TestData.customField,
      customFieldCategories: TestData.customFieldCategories.results
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldsActions.CREATE_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE)
    ];
    instance.create$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('updates a custom field', () => {
    runner.queue(createAction(CustomFieldsActions.UPDATE, TestData.customField));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldsActions.UPDATE_SUCCESS, TestData.customField),
      createAction(CustomFieldCategoriesActions.UPDATE, {
        customFieldID: TestData.customField.customFieldID,
        message: Messages.customFieldEdited
      })
    ];

    instance.update$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('returns error if update fails', () => {
    instance.customFieldData.resolve = false;

    runner.queue(createAction(CustomFieldsActions.UPDATE, {
      customField: TestData.customField,
      customFieldCategories: TestData.customFieldCategories.results
    }));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldsActions.UPDATE_FAIL, TestData.error),
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
