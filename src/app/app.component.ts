import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewAccountPage } from '../pages/view-account/view-account';
import { KitsPage } from '../pages/kits/kits';
import { UserData } from '../providers/user-data';
import { Notifications } from '../providers/notifications';

@Component({
  templateUrl: './app.html'
})
export class StockpileApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  user;
  organization;

  constructor(
    public platform: Platform,
    public userData: UserData,
    public menuCtrl: MenuController,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public notifications: Notifications,
    public events: Events
  ) { }

  ngOnInit() {
    this.userData.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.userData.setUser().then(
          data => {
            this.getUserInfo();
            this.rootPage = TabsPage;
          }
        );
      } else {
        this.rootPage = LoginPage;
      }

      this.initializeApp();
    });

    this.events.subscribe('user:login', () => {
      this.getUserInfo();
    });

    this.events.subscribe('user:edited', user => {
      this.user = user;
    });
  }

  private getUserInfo() {
    this.userData.getUser().subscribe(
      user => this.user = user,
      err => this.notifications.showToast(err)
    );
    this.userData.getOrganization().subscribe(
      organization => this.organization = organization,
      err => this.notifications.showToast(err)
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onViewInfo() {
    this.menuCtrl.close();

    // Cloning user object to avoid passing by reference
    this.nav.push(ViewAccountPage, {
      user: Object.assign({}, this.user)
    });
  }

  onViewKits() {
    this.menuCtrl.close();
    this.nav.push(KitsPage);
  }

  onLogout() {
    this.userData.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
}
