import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { createAction } from '../create-action';
import { TestData } from '../../test-data';
import { UserData } from '../../providers/user-data';
import { UserDataMock } from '../../mocks';

import { OrganizationEffects } from './organization.effects';
import { OrganizationActions } from './organization.actions';
import { AppActions } from '../app/app.actions';

let instance: OrganizationEffects = null;
let runner: EffectsRunner = null;

describe('Organization Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      OrganizationEffects,
      { provide: UserData, useClass: UserDataMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, OrganizationEffects
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
    instance.userData.organization = TestData.organization;

    runner.queue(createAction(OrganizationActions.FETCH));

    instance.fetch$.subscribe(
      res => expect(res).toEqual(createAction(OrganizationActions.FETCH_SUCCESS, TestData.organization))
      err => fail(err)
    );
  });

  it('returns error if fetch fails', () => {
    instance.userData.resolve = false;

    runner.queue(createAction(OrganizationActions.FETCH));

    let performedActions = [];
    const expectedResult = [
      createAction(OrganizationActions.FETCH_FAIL, TestData.error),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.fetch$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });
});
