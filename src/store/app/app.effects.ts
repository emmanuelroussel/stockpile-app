import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppActions } from './app.actions.ts';
import { Notifications } from '../../providers/notifications';
import { createAction } from '../create-action';

@Injectable()
export class AppEffects {
  constructor(
    public actions$: Actions,
    public app: App,
    public platform: Platform,
    public splashScreen: SplashScreen,
    public notifications: Notifications
  ) {}

  /**
   * Goes back one page in nav.
   */
  @Effect()
  popNav$ = this.actions$
    .ofType(AppActions.POP_NAV)
    .do(() => {
      // We need to check if there is a previous page in the active nav because
      // we have to use the root nav instead when the page is accessed through
      // the side menu
      if (this.app.getActiveNav().getPrevious()) {
        this.app.getActiveNav().pop();
      } else {
        this.app.getRootNav().pop();
      }
    })
    .ignoreElements();

  /**
   * Goes back one page in nav.
   */
  @Effect()
  popNavToRoot$ = this.actions$
    .ofType(AppActions.POP_NAV_TO_ROOT)
    .do(() => this.app.getActiveNav().popToRoot())
    .ignoreElements();

  /**
   * Goes back two pages in nav. Removing the parent before popping the nav
   * allows for a smooth transition vs popping the nav twice, which animates
   * both pops and feels buggy.
   */
 @Effect()
 popNavTwice$ = this.actions$
   .ofType(AppActions.POP_NAV_TWICE)
   .mergeMap(() => {
     let nav;

     // We need to check if there is a previous page in the active nav because
     // we have to use the root nav instead when the page is accessed through
     // the side menu
     if (this.app.getActiveNav().getPrevious()) {
       nav = this.app.getActiveNav();
     } else {
       nav = this.app.getRootNav();
     }
     const parentIndex = nav.indexOf(nav.getPrevious());
     return Observable.of(nav.remove(parentIndex))
       .map(() => nav.pop());
   })
   .ignoreElements();

  /**
   * Sets page as the root of the nav.
   */
  @Effect()
  setRootTo$ = this.actions$
    .ofType(AppActions.SET_ROOT_TO)
    .do(action => this.app.getRootNav().setRoot(action.payload))
    .ignoreElements();

  /**
   * Pushes page on the nav stack.
   */
  @Effect()
  pushPage$ = this.actions$
    .ofType(AppActions.PUSH_PAGE)
    .do(action => this.app.getActiveNav().push(action.payload.page, action.payload.navParams))
    .ignoreElements();

  /**
   * Hides splash screen.
   */
  @Effect()
  initializeApp$ = this.actions$
    .ofType(AppActions.INITIALIZE_APP)
    .mergeMap(() => Observable.of(this.platform.ready())
      .map(() => {
        this.splashScreen.hide();
      }))
    .ignoreElements();

  /**
   * Shows a message.
   */
  @Effect()
  showMessage$ = this.actions$
    .ofType(AppActions.SHOW_MESSAGE)
    .do(action => this.notifications.showMessage(action.payload))
    .ignoreElements();
}
