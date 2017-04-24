import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

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
    public notifications: Notifications
  ) { }

  ngOnInit() {
    this.user = this.navParams.get('user');
  }

  onSave() {
    this.userData.editUser(this.user).subscribe(
      data => {
        this.notifications.showToast(Messages.userEdited);
        this.events.publish('user:edited', data);
        this.navCtrl.pop();
      },
      err => this.notifications.showToast(err)
    );
  }
}
