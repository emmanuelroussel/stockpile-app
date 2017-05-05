import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { Notifications } from '../../providers/notifications';
import { Messages } from '../../constants';

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccountPage {
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public userData: UserData,
    public notifications: Notifications,
    public loadingCtrl: LoadingController
  ) { }

  /**
   * Gets the user from the navParams.
   */
  ngOnInit() {
    this.user = this.navParams.get('user');
  }

  /**
   * Calls the api to edit the user's info then pops nav.
   */
  onSave() {
    let loading = this.loadingCtrl.create({
      content: 'Saving changes, please wait...'
    });

    loading.present();

    this.userData.editUser(this.user).subscribe(
      data => {
        this.notifications.showToast(Messages.userEdited);
        this.events.publish('user:edited', data);
        this.navCtrl.pop();
      },
      err => this.notifications.showToast(err),
      () => loading.dismiss()
    );
  }
}
