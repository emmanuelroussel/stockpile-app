import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

}
