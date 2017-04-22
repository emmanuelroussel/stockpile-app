import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { EditAccountPage } from '../edit-account/edit-account';

@Component({
  selector: 'page-view-account',
  templateUrl: 'view-account.html'
})
export class ViewAccountPage {
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) { }

  ngOnInit() {
    this.user = this.navParams.get('user');
  }

  editUser() {
    this.navCtrl.push(EditAccountPage, {
      user: Object.assign({}, this.user)
    });
  }
}
