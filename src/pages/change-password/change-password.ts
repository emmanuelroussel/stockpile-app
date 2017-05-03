import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { Notifications } from '../../providers/notifications';
import { Messages } from '../../constants';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  passwords: { currentPassword?: string, newPassword?: string, confirmPassword?: string } = {};

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public notifications: Notifications
  ) { }

  /**
   * Shows message if the two new passwords don't match. If they do, calls the
   * api to change the password with the new one and pops the nav.
   */
  onSave() {
    if (this.passwords.newPassword === this.passwords.confirmPassword) {
      this.userData.changePassword(this.passwords.currentPassword, this.passwords.newPassword).subscribe(
        data => {
          this.notifications.showToast(data.message);
          this.navCtrl.pop();
        },
        err => this.notifications.showToast(err)
      );
    } else {
      this.notifications.showToast(Messages.passwordsDontMatch);
      this.passwords.newPassword = '';
      this.passwords.confirmPassword = '';
    }
  }
}
