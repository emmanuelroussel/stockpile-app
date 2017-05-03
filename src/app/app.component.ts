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
  // Need to ViewChild Nav instead of using NavController because this is
  // highest level component (<ion-nav> in template)
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

  /**
   * If user is logged in, get the user's info to set in the side menu. Else
   * set rootPage to LoginPage. Then initialize the app (hide splash screen).
   */
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

  /**
   * Gets info about the user's and organization's info.
   */
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

  /**
   * Sets status bar and hides splash screen.
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Closes side menu and pushes ViewAccountPage.
   */
  onViewInfo() {
    this.menuCtrl.close();

    // Cloning user object to avoid passing by reference
    this.nav.push(ViewAccountPage, {
      user: Object.assign({}, this.user)
    });
  }

  /**
   * Closes side menu and pushes KitsPage.
   */
  onViewKits() {
    this.menuCtrl.close();
    this.nav.push(KitsPage);
  }

  /**
   * Logs the user out, closes side menu and sets LoginPage as the root.
   */
  onLogout() {
    this.userData.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }
}
