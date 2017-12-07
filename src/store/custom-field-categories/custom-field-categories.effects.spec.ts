import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { CustomFieldData } from '../../providers/custom-field-data';
import { Store } from '@ngrx/store';
import { CustomFieldDataMock, StoreMock } from '../../mocks';

import { CustomFieldCategoriesEffects } from './custom-field-categories.effects';
import { CustomFieldCategoriesActions } from './custom-field-categories.actions';
import { AppActions } from '../app/app.actions';

let instance: CustomFieldCategoriesEffects = null;
let runner: EffectsRunner = null;

describe('CustomFieldCategories Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CustomFieldCategoriesEffects,
      { provide: CustomFieldData, useClass: CustomFieldDataMock },
      { provide: Store, useClass: StoreMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, CustomFieldCategoriesEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches custom field categories', () => {
    instance.customFieldData.customFieldCategories = TestData.customFieldCategories.results;

    runner.queue(createAction(CustomFieldCategoriesActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(CustomFieldCategoriesActions.FETCH_SUCCESS, TestData.customFieldCategories.results)),
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.customFieldData.resolve = false;

    runner.queue(createAction(CustomFieldCategoriesActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(CustomFieldCategoriesActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });
});
