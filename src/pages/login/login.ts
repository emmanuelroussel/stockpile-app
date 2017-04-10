import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, Events } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { Notifications } from '../../providers/notifications';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public notifications: Notifications,
    public events: Events
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.email, this.login.password).then(
        (data: any) => {
          this.events.publish('user:login');
          this.navCtrl.setRoot(TabsPage);
        },
        err => {
          this.login.password = '';
          this.notifications.showToast(err);
        }
      );
    }
  }
}
