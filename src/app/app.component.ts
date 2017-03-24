import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
    public menuCtrl: MenuController,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.userData.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
}
