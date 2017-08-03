import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { UserData } from '../../providers/user-data';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class UserActions {

  static LOGIN = '[User] Login';
  static LOGIN_SUCCESS = '[User] Login Success';
  static LOGIN_FAIL = '[User] Login Fail';
  static SAVE_TOKEN = '[User] Save Token';

  static LOGOUT = '[User] Logout';
  static LOGOUT_SUCCESS = '[User] Logout Success';
  static LOGOUT_FAIL = '[User] Logout Fail';

  static FETCH = '[User] Fetch';
  static FETCH_SUCCESS = '[User] Fetch Success';
  static FETCH_FAIL = '[User] Fetch Fail';

  static UPDATE = '[User] Update';
  static UPDATE_SUCCESS = '[User] Update Success';
  static UPDATE_FAIL = '[User] Update Fail';

  static CHECK_LOGGED_IN = '[User] Check Logged In';
  static CHECK_LOGGED_IN_SUCCESS = '[User] Check Logged In Success';
  static CHECK_LOGGED_IN_FAIL = '[User] Check Logged In Fail';

  static ARCHIVE = '[User] Archive';
  static ARCHIVE_SUCCESS = '[User] Archive Success';
  static ARCHIVE_FAIL = '[User] Archive Fail';

  static CHANGE_PASSWORD = '[User] Change Password';
  static CHANGE_PASSWORD_SUCCESS = '[User] Change Password Success';
  static CHANGE_PASSWORD_FAIL = '[User] Change Password Fail';

  constructor(
    private store: Store<AppState>,
    private userData: UserData
  ) {}

  loginUser(credentials: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.loggingInUser));
    this.store.dispatch(createAction(UserActions.LOGIN, credentials));
  }

  logoutUser() {
    this.store.dispatch(createAction(UserActions.LOGOUT));
  }

  fetchUser() {
    this.store.dispatch(createAction(UserActions.FETCH));
  }

  updateUser(user: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.updatingUser));
    this.store.dispatch(createAction(UserActions.UPDATE, user));
  }

  checkUserLoggedIn() {
    this.store.dispatch(createAction(UserActions.CHECK_LOGGED_IN));
  }

  archiveUser(password: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.archivingUser));
    this.store.dispatch(createAction(UserActions.ARCHIVE, password));
  }

  changeUserPassword(passwords: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.savingPassword));
    this.store.dispatch(createAction(UserActions.CHANGE_PASSWORD, passwords));
  }
}
