import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserActions } from '../../store/user/user.actions';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};

  constructor(
    public userActions: UserActions
  ) {}

  /**
   * Tries to login with credentials.
   */
  onLogin(form: NgForm) {
    this.userActions.loginUser(form.value);
  }
}
