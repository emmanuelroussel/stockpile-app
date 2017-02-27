import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { StockpileData } from '../../providers/stockpile-data';

@Component({
  selector: 'page-login',
  templateUrl: './login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public stockpileData: StockpileData
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.email, this.login.password).then(
        data => this.navCtrl.setRoot(TabsPage),
        err => {
          this.login.password = '';
          this.stockpileData.showToast(err.message);
        }
      );
    }
  }
}
