import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { UserActions } from '../../store/user/user.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { LoadingMessages, subscribeUrl } from '../../constants';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};

  constructor(
    public userActions: UserActions,
    public layoutActions: LayoutActions,
    public browser: InAppBrowser
  ) {}

  /**
   * Tries to login with credentials.
   */
  onLogin(form: NgForm) {
    this.layoutActions.showLoadingMessage(LoadingMessages.loggingInUser);
    this.userActions.loginUser(form.value);
  }

  /**
   * Opens a browser and directs user to web page to subscribe to Stockpile.
   */
  onSignup() {
    this.browser.create(subscribeUrl);
  }
}
