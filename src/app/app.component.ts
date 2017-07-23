import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController } from 'ionic-angular';

import { ViewAccountPage } from '../pages/view-account/view-account';
import { KitsPage } from '../pages/kits/kits';
import { Organization } from '../models/organization';
import { OrganizationService } from '../services/organization.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserActions } from '../store/user/user.actions';

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

  constructor(
    public menuCtrl: MenuController,
    public organizationService: OrganizationService,
    public userService: UserService,
    public userActions: UserActions
  ) {}

  /**
   * If user is logged in, get the user's info to set in the side menu. Else
   * set rootPage to LoginPage. Then initialize the app (hide splash screen).
   */
  ngOnInit() {
    this.user = this.userService.getUser();
    this.organization = this.organizationService.getOrganization();

    this.userActions.checkUserLoggedIn();
  }

  /**
   * Closes side menu and pushes ViewAccountPage.
   */
  onViewInfo() {
    this.menuCtrl.close();
    this.nav.push(ViewAccountPage);
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
    this.userActions.logoutUser();
    this.menuCtrl.close();
  }
}
