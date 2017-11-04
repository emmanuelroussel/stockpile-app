import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Notifications } from '../../providers/notifications';
import { LoadingMessages, Messages } from '../../constants';
import { UserActions } from '../../store/user/user.actions';
import { LayoutActions } from '../../store/layout/layout.actions';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  passwordForm: FormGroup;
  blur = {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  };

  constructor(
    public notifications: Notifications,
    public userActions: UserActions,
    public layoutActions: LayoutActions,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Builds the form with validators.
   */
  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([
        Validators.minLength(7),
        Validators.required
      ])],
      confirmPassword: ['', Validators.required],
    });
  }

  /**
   * Checks if the two new passwords match. If they do, change the password.
   */
  onSave() {
    this.blur.currentPassword = true;
    this.blur.newPassword = true;
    this.blur.confirmPassword = true;

    if (this.passwordForm.valid) {
      if (this.passwordForm.value.newPassword === this.passwordForm.value.confirmPassword) {
        this.layoutActions.showLoadingMessage(LoadingMessages.savingPassword);
        this.userActions.changeUserPassword({
          currentPassword: this.passwordForm.value.currentPassword,
          newPassword: this.passwordForm.value.newPassword
        });
      } else {
        this.notifications.showMessage(Messages.passwordsDontMatch);
        this.passwordForm.setValue({
          currentPassword: this.passwordForm.value.currentPassword,
          newPassword: '',
          confirmPassword: ''
        });

        this.blur.newPassword = false;
        this.blur.confirmPassword = false;
      }
    }
  }

  get currentPassword() { return this.passwordForm.get('currentPassword'); }

  get newPassword() { return this.passwordForm.get('newPassword'); }

  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
}
