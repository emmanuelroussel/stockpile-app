import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Notifications } from '../../providers/notifications';
import { Messages, LoadingMessages } from '../../constants';
import { UserActions } from '../../store/user/user.actions';
import { LayoutActions } from '../../store/layout/layout.actions';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {

  constructor(
    public notifications: Notifications,
    public userActions: UserActions,
    public layoutActions: LayoutActions
  ) {}

  /**
   * Checks if the two new passwords match. If they do, change the password.
   */
  onSave(form: NgForm) {
    if (form.value.newPassword === form.value.confirmPassword) {
      this.layoutActions.showLoadingMessage(LoadingMessages.savingPassword);
      this.userActions.changeUserPassword({
        currentPassword: form.value.currentPassword,
        newPassword: form.value.newPassword
      });
    } else {
      this.notifications.showMessage(Messages.passwordsDontMatch);
      form.setValue({
        currentPassword: form.value.currentPassword,
        newPassword: '',
        confirmPassword: ''
      });
    }
  }
}
