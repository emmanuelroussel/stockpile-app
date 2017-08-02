import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { UserData } from '../../providers/user-data';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class UserActions {

  static LOGIN_USER = 'LOGIN_USER';
  static LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  static LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
  static SAVE_TOKEN = 'SAVE_TOKEN';

  static LOGOUT_USER = 'LOGOUT_USER';
  static LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
  static LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

  static FETCH_USER = 'FETCH_USER';
  static FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
  static FETCH_USER_ERROR = 'FETCH_USER_ERROR';

  static UPDATE_USER = 'UPDATE_USER';
  static UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
  static UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

  static CHECK_USER_LOGGED_IN = 'CHECK_USER_LOGGED_IN';
  static CHECK_USER_LOGGED_IN_SUCCESS = 'CHECK_USER_LOGGED_IN_SUCCESS';
  static CHECK_USER_LOGGED_IN_ERROR = 'CHECK_USER_LOGGED_IN_ERROR';

  static ARCHIVE_USER = 'ARCHIVE_USER';
  static ARCHIVE_USER_SUCCESS = 'ARCHIVE_USER_SUCCESS';
  static ARCHIVE_USER_ERROR = 'ARCHIVE_USER_ERROR';

  static CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD';
  static CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS';
  static CHANGE_USER_PASSWORD_ERROR = 'CHANGE_USER_PASSWORD_ERROR';

  constructor(
    private store: Store<AppState>,
    private userData: UserData
  ) {}

  loginUser(credentials: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.loggingInUser));
    this.store.dispatch(createAction(UserActions.LOGIN_USER, credentials));
  }

  logoutUser() {
    this.store.dispatch(createAction(UserActions.LOGOUT_USER));
  }

  fetchUser() {
    this.store.dispatch(createAction(UserActions.FETCH_USER));
  }

  updateUser(user: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.updatingUser));
    this.store.dispatch(createAction(UserActions.UPDATE_USER, user));
  }

  checkUserLoggedIn() {
    this.store.dispatch(createAction(UserActions.CHECK_USER_LOGGED_IN));
  }

  archiveUser(password: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.archivingUser));
    this.store.dispatch(createAction(UserActions.ARCHIVE_USER, password));
  }

  changeUserPassword(passwords: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.savingPassword));
    this.store.dispatch(createAction(UserActions.CHANGE_USER_PASSWORD, passwords));
  }
}
