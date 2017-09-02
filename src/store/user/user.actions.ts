import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class UserActions {

  static LOGIN = type('[User] Login');
  static LOGIN_SUCCESS = type('[User] Login Success');
  static LOGIN_FAIL = type('[User] Login Fail');
  static SAVE_TOKEN = type('[User] Save Token');

  static LOGOUT = type('[User] Logout');
  static LOGOUT_SUCCESS = type('[User] Logout Success');
  static LOGOUT_FAIL = type('[User] Logout Fail');

  static FETCH = type('[User] Fetch');
  static FETCH_SUCCESS = type('[User] Fetch Success');
  static FETCH_FAIL = type('[User] Fetch Fail');

  static UPDATE = type('[User] Update');
  static UPDATE_SUCCESS = type('[User] Update Success');
  static UPDATE_FAIL = type('[User] Update Fail');

  static CHECK_LOGGED_IN = type('[User] Check Logged In');
  static CHECK_LOGGED_IN_SUCCESS = type('[User] Check Logged In Success');
  static CHECK_LOGGED_IN_FAIL = type('[User] Check Logged In Fail');

  static ARCHIVE = type('[User] Archive');
  static ARCHIVE_SUCCESS = type('[User] Archive Success');
  static ARCHIVE_FAIL = type('[User] Archive Fail');

  static CHANGE_PASSWORD = type('[User] Change Password');
  static CHANGE_PASSWORD_SUCCESS = type('[User] Change Password Success');
  static CHANGE_PASSWORD_FAIL = type('[User] Change Password Fail');

  constructor(private store: Store<AppState>) {}

  loginUser(credentials: any) {
    this.store.dispatch(createAction(UserActions.LOGIN, credentials));
  }

  logoutUser() {
    this.store.dispatch(createAction(UserActions.LOGOUT));
  }

  fetchUser() {
    this.store.dispatch(createAction(UserActions.FETCH));
  }

  updateUser(user: any) {
    this.store.dispatch(createAction(UserActions.UPDATE, user));
  }

  checkUserLoggedIn() {
    this.store.dispatch(createAction(UserActions.CHECK_LOGGED_IN));
  }

  archiveUser(password: string) {
    this.store.dispatch(createAction(UserActions.ARCHIVE, password));
  }

  changeUserPassword(passwords: any) {
    this.store.dispatch(createAction(UserActions.CHANGE_PASSWORD, passwords));
  }
}
