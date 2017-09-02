import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Storage } from '@ionic/storage';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { AppState } from '../../models/app-state';

import { createAction } from '../create-action';
import { UserActions } from './user.actions';
import { AppActions } from '../app/app.actions.ts';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../../pages/tabs/tabs';
import { OrganizationActions } from '../organization/organization.actions';
import { LoginPage } from '../../pages/login/login';
import { Messages } from '../../constants';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class UserEffects {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public actions$: Actions,
    public storage: Storage,
    public userData: UserData,
    public store$: Store<AppState>
  ) {}

  /**
   * Logs user in.
   */
  @Effect()
  login$ = this.actions$
    .ofType(UserActions.LOGIN)
    .mergeMap(action => this.userData.login(action.payload)
      .map(res => createAction(UserActions.SAVE_TOKEN, res))
      .catch(err => Observable.of(
        createAction(UserActions.LOGIN_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Saves auth token to storage.
   */
  @Effect()
  saveToken$ = this.actions$
    .ofType(UserActions.SAVE_TOKEN)
    .mergeMap(action => Observable.of(this.storage.set('id_token', action.payload.token))
      .concatMap(() => [
        createAction(UserActions.LOGIN_SUCCESS, this.getIDsFromToken(action.payload.token)),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(UserActions.LOGIN_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Publishes event to fetch user and organization and navigate home on
   * successful login.
   */
  @Effect()
  loginSuccess$ = this.actions$
    .ofType(UserActions.LOGIN_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(UserActions.FETCH, action.payload.userID),
      createAction(OrganizationActions.FETCH, action.payload.organizationID),
      createAction(AppActions.SET_ROOT_TO, TabsPage)
    ))
    .delay(1);

  /**
   * Verifies if a user is currently logged in (i.e. valid auth token).
   */
  @Effect()
  checkUserLoggedIn$ = this.actions$
    .ofType(UserActions.CHECK_LOGGED_IN)
    .mergeMap(() => Observable.fromPromise(this.storage.get('id_token'))
      .concatMap(token => {
        if (tokenNotExpired(null, token)) {
          return [
            createAction(UserActions.CHECK_LOGGED_IN_SUCCESS),
            createAction(AppActions.INITIALIZE),
            createAction(UserActions.LOGIN_SUCCESS, this.getIDsFromToken(token))
          ];
        } else {
          return [
            createAction(UserActions.CHECK_LOGGED_IN_FAIL),
            createAction(AppActions.INITIALIZE),
            createAction(AppActions.SET_ROOT_TO, LoginPage)
          ];
        }
      })
    );

  /**
   * Removes auth token from storage.
   */
  @Effect()
  logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .mergeMap(action => Observable.of(this.storage.remove('id_token'))
      .concatMap(res => [
        createAction(UserActions.LOGOUT_SUCCESS),
        createAction(AppActions.SET_ROOT_TO, LoginPage)
      ])
      .catch(err => Observable.of(
        createAction(UserActions.LOGOUT_FAIL, err)
      ))
    );

  /**
   * Fetches user.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(UserActions.FETCH)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.getUser(store.user.userID || action.payload)
      .map(res => createAction(UserActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(createAction(UserActions.FETCH_FAIL, err)))
    );

  /**
   * Updates user.
   */
  @Effect()
  update$ = this.actions$
    .ofType(UserActions.UPDATE)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.updateUser(store.user.userID, action.payload)
      .concatMap(res => [
        createAction(UserActions.UPDATE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.userEdited),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(UserActions.UPDATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Checks password and archives user if valid by setting archived to today's
   * date.
   */
  @Effect()
  archive$ = this.actions$
    .ofType(UserActions.ARCHIVE)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.login({ email: store.user.email, password: action.payload })
      .map(res => {
        const user = {
          archived: new Date().toISOString().substring(0, 10)
        };

        this.userData.updateUser(store.user.userID, user)
          .concatMap(res => [
            createAction(UserActions.ARCHIVE_SUCCESS, user),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE),
              createAction(AppActions.SHOW_MESSAGE, Messages.userDeleted),
              createAction(UserActions.LOGOUT)
          ])
          .catch(err => Observable.of(
            createAction(UserActions.ARCHIVE_FAIL, err),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE),
            createAction(AppActions.SHOW_MESSAGE, err.message)
          ));
      })
      .catch(err => Observable.of(
        createAction(UserActions.ARCHIVE_FAIL),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.wrongPassword)
      ))
    );

  /**
   * Changes the user's password.
   */
  @Effect()
  changePassword$ = this.actions$
    .ofType(UserActions.CHANGE_PASSWORD)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.changePassword(store.user.userID, action.payload)
      .concatMap(res => [
        createAction(UserActions.CHANGE_PASSWORD_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, res.message),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(UserActions.CHANGE_PASSWORD_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  private getIDsFromToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      userID: decodedToken.userID,
      organizationID: decodedToken.organizationID
    };
  }
}
