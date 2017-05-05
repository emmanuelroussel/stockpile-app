import { Component } from '@angular/core';
import { NavController, Events, LoadingController } from 'ionic-angular';

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
    public events: Events,
    public loadingCtrl: LoadingController
  ) { }

  /**
   * Calls the api with credentials to login and goes to TabsPage if successful.
   */
  onLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Logging you in, please wait...'
    });

    loading.present();

    this.userData.login(this.login.email, this.login.password).then(
      (data: any) => {
        this.userData.setUser().then(
          data => {
            this.events.publish('user:login');
            loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
          }
        );
      },
      err => {
        this.login.password = '';
        loading.dismiss();
        this.notifications.showToast(err);
      }
    );
  }
}
