import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserActions } from '../../store/user/user.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};

  constructor(
    public userActions: UserActions,
    public layoutActions: LayoutActions
  ) {}

  /**
   * Tries to login with credentials.
   */
  onLogin(form: NgForm) {
    this.layoutActions.showLoadingMessage(LoadingMessages.loggingInUser);
    this.userActions.loginUser(form.value);
  }
}
