import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { UserActions } from './user.actions';

let instance: UserActions = null;

describe('User Actions', () => {

  beforeEach(() => {
    instance = new UserActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action LOGIN', () => {
    spyOn(instance.store, 'dispatch');
    instance.loginUser(TestData.credentials);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(UserActions.LOGIN, TestData.credentials));
  });

  it('dispatches action LOGOUT', () => {
    spyOn(instance.store, 'dispatch');
    instance.logoutUser();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(UserActions.LOGOUT));
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchUser();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(UserActions.FETCH));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateUser(TestData.user);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(UserActions.UPDATE, TestData.user));
  });

  it('dispatches action CHECK_LOGGED_IN', () => {
    spyOn(instance.store, 'dispatch');
    instance.checkUserLoggedIn();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(UserActions.CHECK_LOGGED_IN));
  });

  it('dispatches action ARCHIVE', () => {
    spyOn(instance.store, 'dispatch');
    instance.archiveUser(TestData.credentials.password);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(UserActions.ARCHIVE, TestData.credentials.password));
  });

  it('dispatches action CHANGE_PASSWORD', () => {
    spyOn(instance.store, 'dispatch');
    instance.changeUserPassword(TestData.passwords);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(UserActions.CHANGE_PASSWORD, TestData.passwords));
  });
});
