import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { KitData } from '../../providers/kit-data';
import { KitDataMock } from '../../mocks';

import { KitModelsEffects } from './kit-models.effects';
import { KitModelsActions } from './kit-models.actions';
import { AppActions } from '../app/app.actions';

let instance: KitModelsEffects = null;
let runner: EffectsRunner = null;

describe('KitModels Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      KitModelsEffects,
      { provide: KitData, useClass: KitDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, KitModelsEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('fetches kit models', () => {
    instance.kitData.kitModels = TestData.kitModels.results;

    runner.queue(createAction(KitModelsActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(KitModelsActions.FETCH_SUCCESS, TestData.kitModels.results))
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.kitData.resolve = false;

    runner.queue(createAction(KitModelsActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(KitModelsActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });
});
