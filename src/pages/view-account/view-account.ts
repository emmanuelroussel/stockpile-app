import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events, AlertController } from 'ionic-angular';

import { EditAccountPage } from '../edit-account/edit-account';
import { ChangePasswordPage } from '../change-password/change-password';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';
import { Notifications } from '../../providers/notifications';
import { Messages } from '../../constants';

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
    public events: Events,
    public alertCtrl: AlertController,
    public userData: UserData,
    public notifications: Notifications
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

  /**
   * Prompts user for password to archive their account. This does not delete
   * the account as this is an admin feature.
   */
  deleteAccount() {
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
            this.userData.getUser().subscribe(
              user => {
                this.userData.login(user.email, data.password).then(
                  success => this.archiveUser(),
                  err => this.notifications.showToast(Messages.wrongPassword)
                );
              },
              err => this.notifications.showToast(err)
            );
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
          handler: () => passwordAlert.present()
        }
      ]
    });

    confirmAlert.present();
  }

  /**
   * Archives the user by setting the archived parameter to today's date in
   * MySQL format.
   */
  private archiveUser() {
    const body = {
      archived: new Date().toISOString().substring(0, 10)
    };

    this.userData.editUser(body).subscribe(
      success => {
        this.notifications.showToast(Messages.userDeleted);
        this.userData.logout();
        this.navCtrl.setRoot(LoginPage);
      },
      err => this.notifications.showToast(err)
    );
  }
}
