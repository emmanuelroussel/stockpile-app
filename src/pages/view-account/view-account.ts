import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';

import { EditAccountPage } from '../edit-account/edit-account';
import { ChangePasswordPage } from '../change-password/change-password';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { UserActions } from '../../store/user/user.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { LoadingMessages } from '../../constants';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-view-account',
  templateUrl: 'view-account.html'
})
export class ViewAccountPage {
  user: Observable<User>;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public userService: UserService,
    public userActions: UserActions,
    public layoutActions: LayoutActions
  ) {}

  /**
   * Gets user.
   */
  ngOnInit() {
    this.user = this.userService.getUser();
  }

  /**
   * Pushes page on nav to allow users to edit their info.
   */
  onEditUser() {
    this.navCtrl.push(EditAccountPage);
  }

  /**
   * Pushes pages on nav to allow user to change their password.
   */
  onChangePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }

  /**
   * Creates two alerts. First to warn user about deleting their account, second
   * to prompt them for their password. This does not delete the account as this
   * is an admin feature.
   */
  onDeleteAccount() {
    let passwordAlert = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'This will delete your account permanently.',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: data => {
            this.layoutActions.showLoadingMessage(LoadingMessages.archivingUser);
            this.userActions.archiveUser(data.password);
          }
        }
      ]
    });

    let confirmAlert = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            passwordAlert.present();
          }
        }
      ]
    });

    confirmAlert.present();
  }
}
