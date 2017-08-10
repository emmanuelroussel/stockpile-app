import { TestBed, inject } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { UserData } from '../../providers/user-data';
import { UserDataMock StorageMock, StoreMock } from '../../mocks';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { LoginPage } from '../../pages/login/login';
import { Observable } from 'rxjs/Observable';

import { UserEffects } from './user.effects';
import { UserActions } from './user.actions';
import { AppActions } from '../app/app.actions';
import { LayoutActions } from '../layout/layout.actions';

let instance: OrganizationEffects = null;
let runner: EffectsRunner = null;

describe('User Effects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      UserEffects,
      { provide: UserData, useClass: UserDataMock },
      { provide: Storage, useClass: StorageMock },
      { provide: Store, useClass: StoreMock }
    ]
  }));

  beforeEach(inject([
      EffectsRunner, UserEffects
    ],
    (_runner, _instance) => {
      runner = _runner;
      instance = _instance;
    }
  ));

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('logs in user', () => {
    runner.queue(createAction(UserActions.LOGIN));

    instance.login$.subscribe(
      res => expect(res).toEqual(createAction(UserActions.SAVE_TOKEN, TestData.loginResponse))
      err => fail(err)
    );
  });

  it('returns error if login fails', () => {
    instance.userData.resolve = false;

    runner.queue(createAction(UserActions.LOGIN));

    let performedActions = [];
    const expectedResult = [
      createAction(UserActions.LOGIN_FAIL, TestData.error),
      createAction(LayoutActions.HIDE_LOADING_MESSAGE),
      createAction(AppActions.SHOW_MESSAGE, TestData.error.message)
    ];
    instance.login$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });

  it('logs out user', () => {
    runner.queue(createAction(UserActions.LOGOUT));

    let performedActions = [];
    const expectedResult = [
      createAction(UserActions.LOGOUT_SUCCESS),
      createAction(AppActions.SET_ROOT_TO, LoginPage)
    ];

    instance.logout$.take(expectedResult.length).subscribe(
      res => performedActions.push(res),
      err => fail(err),
      () => expect(performedActions).toEqual(expectedResult)
    );
  });
});
