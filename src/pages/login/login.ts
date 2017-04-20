import { Component } from '@angular/core';
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

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public notifications: Notifications,
    public events: Events
  ) { }

  onLogin() {
    this.userData.login(this.login.email, this.login.password).then(
      (data: any) => {
        this.userData.setUser().then(
          data => {
            this.events.publish('user:login');
            this.navCtrl.setRoot(TabsPage);
          }
        );
      },
      err => {
        this.login.password = '';
        this.notifications.showToast(err);
      }
    );
  }
}
