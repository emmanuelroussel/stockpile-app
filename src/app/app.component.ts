import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, LoadingController } from 'ionic-angular';

import { ViewAccountPage } from '../pages/view-account/view-account';
import { Organization } from '../models/organization';
import { OrganizationService } from '../services/organization.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserActions } from '../store/user/user.actions';
import { LayoutService } from '../services/layout.service';
import { BrandsService } from '../services/brands.service';
import { CategoriesService } from '../services/categories.service';
import { ModelsService } from '../services/models.service';
import { BrandsActions } from '../store/brands/brands.actions';
import { ModelsActions } from '../store/models/models.actions';
import { CategoriesActions } from '../store/categories/categories.actions';
import { ItemProperties } from '../constants';
import { FieldsPage } from '../pages/fields/fields';
import { ExternalRentersPage } from '../pages/external-renters/external-renters';
import { CustomFieldsPage } from '../pages/custom-fields/custom-fields';

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
    public layoutService: LayoutService,
    public brandsService: BrandsService,
    public modelsService: ModelsService,
    public categoriesService: CategoriesService,
    public brandsActions: BrandsActions,
    public modelsActions: ModelsActions,
    public categoriesActions: CategoriesActions
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
   * Closes side menu and pushes ExternalRentersPage.
   */
  onViewExternalRenters() {
    this.menuCtrl.close();
    this.nav.push(ExternalRentersPage);
  }

  /**
   * Fetches brands, closes side menu and pushes Fields page with brands.
   */
  onViewBrands() {
    this.brandsActions.fetchBrands();
    this.menuCtrl.close();
    this.nav.push(FieldsPage, {
      fields: this.brandsService.getBrands(),
      type: ItemProperties.brand,
      typePlural: ItemProperties.brandPlural
    });
  }

  /**
   * Fetches models, closes side menu and pushes Fields page with models.
   */
  onViewModels() {
    this.modelsActions.fetchModels();
    this.menuCtrl.close();
    this.nav.push(FieldsPage, {
      fields: this.modelsService.getModels(),
      type: ItemProperties.model,
      typePlural: ItemProperties.modelPlural
    });
  }

  /**
   * Fetches categories, closes side menu and pushes Fields page with categories.
   */
  onViewCategories() {
    this.categoriesActions.fetchCategories();
    this.menuCtrl.close();
    this.nav.push(FieldsPage, {
      fields: this.categoriesService.getCategories(),
      type: ItemProperties.category,
      typePlural: ItemProperties.categoryPlural
    });
  }

  /**
   * Closes side menu and pushes CustomFieldsPage.
   */
  onViewCustomFields() {
    this.menuCtrl.close();
    this.nav.push(CustomFieldsPage);
  }

  /**
   * Logs the user out, closes side menu and sets LoginPage as the root.
   */
  onLogout() {
    this.userActions.logoutUser();
    this.menuCtrl.close();
  }
}
