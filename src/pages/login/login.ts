import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { UserActions } from '../../store/user/user.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { LoadingMessages, subscribeUrl } from '../../constants';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  blur = {
    email: false,
    password: false
  };

  constructor(
    public userActions: UserActions,
    public layoutActions: LayoutActions,
    public browser: InAppBrowser,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Builds the form with validators.
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
    });
  }

  /**
   * Tries to login with credentials.
   */
  onLogin() {
    this.blur.email = true;
    this.blur.password = true;

    if (this.loginForm.valid) {
      this.layoutActions.showLoadingMessage(LoadingMessages.loggingInUser);
      this.userActions.loginUser(this.loginForm.value);
    }
  }

  /**
   * Opens a browser and directs user to web page to subscribe to Stockpile.
   */
  onSignup() {
    this.browser.create(subscribeUrl);
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
}
