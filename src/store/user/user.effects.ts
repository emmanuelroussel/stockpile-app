import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { App } from 'ionic-angular';
import { AppState } from '../../models/app-state';

import { createAction } from '../create-action';
import { UserActions } from './user.actions';
import { AppActions } from '../app/app.actions.ts';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../../pages/tabs/tabs';
import { UserService } from '../../services/user.service';
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
    public app: App,
    public userService: UserService,
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public store$: Store<AppState>
  ) {}

  /**
   * Logs user in.
   */
  @Effect()
  login$ = this.actions$
    .ofType(UserActions.LOGIN_USER)
    .mergeMap(action => this.userData.login(action.payload)
      .map(res => createAction(UserActions.SAVE_TOKEN, res))
      .catch(err => Observable.of(
        createAction(UserActions.LOGIN_USER_ERROR, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Saves auth token to storage.
   */
  @Effect()
  saveToken$ = this.actions$
    .ofType(UserActions.SAVE_TOKEN)
    .mergeMap(action => Observable.of(this.storage.set('id_token', action.payload.token))
      .concatMap(res => [
        createAction(UserActions.LOGIN_USER_SUCCESS, this.getIDsFromToken(action.payload.token)),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(UserActions.LOGIN_USER_ERROR, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Goes back to login page if error while logging user in.
   */
  @Effect()
  loginError$ = this.actions$
    .ofType(UserActions.LOGIN_USER_ERROR)
    .do(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, action.payload.message),
      createAction(AppActions.SET_ROOT_TO, LoginPage)
    ))
    .delay(1);

  /**
   * Publishes event to fetch user and organization and navigate home on
   * successful login.
   */
  @Effect()
  loginSuccess$ = this.actions$
    .ofType(UserActions.LOGIN_USER_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(UserActions.FETCH_USER, action.payload.userID),
      createAction(OrganizationActions.FETCH_ORGANIZATION, action.payload.organizationID),
      createAction(AppActions.SET_ROOT_TO, TabsPage)
    ))
    .delay(1);

  /**
   * Verifies if a user is currently logged in (i.e. valid auth token).
   */
  @Effect()
  checkUserLoggedIn$ = this.actions$
    .ofType(UserActions.CHECK_USER_LOGGED_IN)
    .mergeMap(() => Observable.fromPromise(this.storage.get('id_token'))
      .map(token => {
        if (tokenNotExpired(null, token)) {
          return createAction(UserActions.CHECK_USER_LOGGED_IN_SUCCESS, this.getIDsFromToken(token));
        } else {
          return createAction(UserActions.CHECK_USER_LOGGED_IN_ERROR);
        }
      })
    );

  /**
   * If user is already logged in, initialize app and get info.
   */
  @Effect()
  checkUserLoggedInSuccess$ = this.actions$
    .ofType(UserActions.CHECK_USER_LOGGED_IN_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.INITIALIZE_APP),
      createAction(UserActions.LOGIN_USER_SUCCESS, action.payload)
    ))
    .delay(1);

  /**
   * If user is not already logged in, initialize app and set nav root.
   */
  @Effect()
  checkUserLoggedInError$ = this.actions$
    .ofType(UserActions.CHECK_USER_LOGGED_IN_ERROR)
    .mergeMap(() => Observable.of(
      createAction(AppActions.INITIALIZE_APP),
      createAction(AppActions.SET_ROOT_TO, LoginPage)
    ))
    .delay(1);

  /**
   * Removes auth token from storage.
   */
  @Effect()
  logout$ = this.actions$
    .ofType(UserActions.LOGOUT_USER)
    .mergeMap(action => Observable.of(this.storage.remove('id_token'))
      .map(res => createAction(UserActions.LOGOUT_USER_SUCCESS))
      .catch(err => Observable.of(createAction(UserActions.LOGOUT_USER_ERROR, err)))
    );

  /**
   * Navigates home on sucessful logout.
   */
  @Effect()
  logoutSuccess$ = this.actions$
    .ofType(UserActions.LOGOUT_USER_SUCCESS)
    .mergeMap(action => Observable.of(createAction(AppActions.SET_ROOT_TO, LoginPage)))
    .delay(1);

  /**
   * Shows message on unsuccessful logout.
   */
  @Effect()
  logoutError$ = this.actions$
    .ofType(UserActions.LOGOUT_USER_ERROR)
    .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
    .delay(1);

  /**
   * Fetches user.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(UserActions.FETCH_USER)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.getUser(store.user.userID || action.payload)
      .map(res => createAction(UserActions.FETCH_USER_SUCCESS, res))
      .catch(err => Observable.of(createAction(UserActions.FETCH_USER_ERROR, err)))
    );

  /**
   * Updates user.
   */
  @Effect()
  update$ = this.actions$
    .ofType(UserActions.UPDATE_USER)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.updateUser(store.user.userID, action.payload)
      .concatMap(res => [
        createAction(UserActions.UPDATE_USER_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(UserActions.UPDATE_USER_ERROR, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * On successful user update, pop nav.
   */
  @Effect()
  updateSuccess$ = this.actions$
    .ofType(UserActions.UPDATE_USER_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, Messages.userEdited),
      createAction(AppActions.POP_NAV)
    ))
    .delay(1);

  /**
   * Checks password and archives user if valid by setting archived to today's
   * date.
   */
  @Effect()
  archive$ = this.actions$
    .ofType(UserActions.ARCHIVE_USER)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.login({ email: store.user.email, password: action.payload })
      .map(res => {
        const user = {
          archived: new Date().toISOString().substring(0, 10)
        };

        this.userData.updateUser(store.user.userID, user)
          .concatMap(res => [
            createAction(UserActions.ARCHIVE_USER_SUCCESS, user),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE)
          ])
          .catch(err => Observable.of(
            createAction(UserActions.ARCHIVE_USER_ERROR, err),
            createAction(LayoutActions.HIDE_LOADING_MESSAGE)
          ));
      })
      .catch(err => Observable.of(
        createAction(UserActions.ARCHIVE_USER_ERROR, Messages.wrongPassword),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * On successful user archival, logout user.
   */
  @Effect()
  archiveSuccess$ = this.actions$
    .ofType(UserActions.ARCHIVE_USER_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, Messages.userDeleted),
      createAction(UserActions.LOGOUT_USER)
    ))
    .delay(1);

  /**
   * On unsuccessful user archival, show error message.
   */
  @Effect()
  archiveError$ = this.actions$
    .ofType(UserActions.ARCHIVE_USER_ERROR, UserActions.CHANGE_USER_PASSWORD_ERROR)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, action.payload.message)
    ))
    .delay(1);

  /**
   * Changes the user's password.
   */
  @Effect()
  changePassword$ = this.actions$
    .ofType(UserActions.CHANGE_USER_PASSWORD)
    .withLatestFrom(this.store$)
    .mergeMap(([action, store]) => this.userData.changePassword(store.user.userID, action.payload)
      .concatMap(res => [
        createAction(UserActions.CHANGE_USER_PASSWORD_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(UserActions.CHANGE_USER_PASSWORD_ERROR, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * On successful password change, pop nav.
   */
  @Effect()
  changePasswordSuccess$ = this.actions$
    .ofType(UserActions.CHANGE_USER_PASSWORD_SUCCESS)
    .mergeMap(action => Observable.of(
      createAction(AppActions.SHOW_MESSAGE, action.payload.message),
      createAction(AppActions.POP_NAV)
    ))
    .delay(1);

  private getIDsFromToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      userID: decodedToken.userID,
      organizationID: decodedToken.organizationID
    };
  }
}
