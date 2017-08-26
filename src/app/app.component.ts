import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, LoadingController } from 'ionic-angular';

import { ViewAccountPage } from '../pages/view-account/view-account';
import { Organization } from '../models/organization';
import { OrganizationService } from '../services/organization.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserActions } from '../store/user/user.actions';
import { LayoutService } from '../services/layout.service';

import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './app.html'
})
export class StockpileApp {
  // Need to ViewChild Nav instead of using NavController because this is
  // highest level component (<ion-nav> in template)
  @ViewChild(Nav) nav: Nav;
  user: Observable<User>;
  organization: Observable<Organization>;
  loadingMessage: Observable<string>;

  constructor(
    public menuCtrl: MenuController,
    public organizationService: OrganizationService,
    public loadingCtrl: LoadingController,
    public userService: UserService,
    public userActions: UserActions,
    public layoutService: LayoutService
  ) {}

  /**
   * If user is logged in, get the user's info to set in the side menu. Else
   * set rootPage to LoginPage. Then initialize the app (hide splash screen).
   */
  ngOnInit() {
    this.user = this.userService.getUser();
    this.organization = this.organizationService.getOrganization();

    this.userActions.checkUserLoggedIn();
    this.loadingMessage = this.layoutService.getLoadingMessage();

    let loading = this.loadingCtrl.create({ content: 'Loading...' });

    // Toggles the loading popup
    this.loadingMessage.subscribe(message => {
      if (message) {
        loading = this.loadingCtrl.create({ content: message });
        loading.present();
      } else {
        // Using timeout to avoid occasional error caused by a bug in Ionic when
        // using Loading with Nav changes. Seems related to
        // https://github.com/ionic-team/ionic/issues/9589
        setTimeout(() => loading.dismiss(), 10);
      }
    });
  }

  /**
   * Closes side menu.
   */
   closeMenu() {
     this.menuCtrl.close();
   }

  /**
   * Closes side menu and pushes ViewAccountPage.
   */
  onViewInfo() {
    this.menuCtrl.close();
    this.nav.push(ViewAccountPage);
  }

  /**
   * Logs the user out, closes side menu and sets LoginPage as the root.
   */
  onLogout() {
    this.userActions.logoutUser();
    this.menuCtrl.close();
  }
}
