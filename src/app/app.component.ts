import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StockpileData } from '../providers/stockpile-data';
import { UserData } from '../providers/user-data';

@Component({
  templateUrl: './app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    public platform: Platform,
    public stockpileData: StockpileData,
    public userData: UserData,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.stockpileData.initHal().then(() => {
      this.userData.isLoggedIn().then(loggedIn => {
        if (loggedIn) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }

        this.initializeApp();
      });
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
