import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { UserData } from '../providers/user-data';

@Component({
  templateUrl: './app.html'
})
export class StockpileApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    public platform: Platform,
    public userData: UserData,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.userData.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.userData.setUser();
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }

      this.initializeApp();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  logout() {
    this.userData.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
}
