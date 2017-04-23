import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';

import { EditAccountPage } from '../edit-account/edit-account';
import { ChangePasswordPage } from '../change-password/change-password';

@Component({
  selector: 'page-view-account',
  templateUrl: 'view-account.html'
})
export class ViewAccountPage {
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public events: Events
  ) { }

  ngOnInit() {
    this.user = this.navParams.get('user');

    this.events.subscribe('user:edited', user => {
      this.user = user;
    });
  }

  editUser() {
    this.navCtrl.push(EditAccountPage, {
      user: Object.assign({}, this.user)
    });
  }

  changePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
}
