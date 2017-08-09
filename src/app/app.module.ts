import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudModule } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthHttp } from 'angular2-jwt';
import { StockpileApp } from './app.component';

import { AppActions } from '../store/app/app.actions';
import { AppEffects } from '../store/app/app.effects';
import { rootReducer } from '../store/root-reducer';
import { OrganizationActions } from '../store/organization/organization.actions';
import { OrganizationEffects } from '../store/organization/organization.effects';
import { OrganizationService } from '../services/organization.service';
import { UserActions } from '../store/user/user.actions';
import { UserEffects } from '../store/user/user.effects';
import { UserService } from '../services/user.service';
import { KitsActions } from '../store/kits/kits.actions';
import { KitsEffects } from '../store/kits/kits.effects';
import { KitsService } from '../services/kits.service';
import { KitModelsActions } from '../store/kit-models/kit-models.actions';
import { KitModelsEffects } from '../store/kit-models/kit-models.effects';
import { KitModelsService } from '../services/kit-models.service';
import { BrandsActions } from '../store/brands/brands.actions';
import { BrandsEffects } from '../store/brands/brands.effects';
import { BrandsService } from '../services/brands.service';
import { ModelsActions } from '../store/models/models.actions';
import { ModelsEffects } from '../store/models/models.effects';
import { ModelsService } from '../services/models.service';
import { CategoriesActions } from '../store/categories/categories.actions';
import { CategoriesEffects } from '../store/categories/categories.effects';
import { CategoriesService } from '../services/categories.service';
import { ItemsActions } from '../store/items/items.actions';
import { ItemsEffects } from '../store/items/items.effects';
import { ItemsService } from '../services/items.service';
import { LayoutActions } from '../store/layout/layout.actions';
import { LayoutService } from '../services/layout.service';

import { AddKitModelPage } from '../pages/add-kit-model/add-kit-model';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { EditKitPage } from '../pages/edit-kit/edit-kit';
import { HomePage } from '../pages/home/home';
import { InventoryFilterPage } from '../pages/inventory-filter/inventory-filter';
import { InventoryPage } from '../pages/inventory/inventory';
import { ItemFilterPage } from '../pages/item-filter/item-filter';
import { KitRentalPage } from '../pages/kit-rental/kit-rental';
import { KitsPage } from '../pages/kits/kits';
import { LoginPage } from '../pages/login/login';
import { RentalPage } from '../pages/rental/rental';
import { RentalDetailsPage } from '../pages/rental-details/rental-details';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewAccountPage } from '../pages/view-account/view-account';
import { ViewItemPage } from '../pages/view-item/view-item';
import { ViewKitPage } from '../pages/view-kit/view-kit';

import { MapToIterablePipe } from '../pipes/map-to-iterable.pipe';

import { Api } from '../providers/api';
import { ApiUrl } from '../providers/api-url';
import { ItemData } from '../providers/item-data';
import { ItemPropertyData } from '../providers/item-property-data';
import { KitData } from '../providers/kit-data';
import { Notifications } from '../providers/notifications';
import { UserData } from '../providers/user-data';

import { RavenErrorHandler } from '../utils/raven-error-handler';
import { getAuthHttp, cloudSettings } from '../utils/auth-http-helpers';

@NgModule({
  declarations: [
    StockpileApp,
    AddKitModelPage,
    ChangePasswordPage,
    EditAccountPage,
    EditItemPage,
    EditKitPage,
    HomePage,
    InventoryFilterPage,
    InventoryPage,
    ItemFilterPage,
    KitRentalPage,
    KitsPage,
    LoginPage,
    MapToIterablePipe,
    RentalPage,
    RentalDetailsPage,
    TabsPage,
    ViewAccountPage,
    ViewItemPage,
    ViewKitPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(StockpileApp, {
      tabsHideOnSubPages: true,
      platforms: {
        android: {
          tabsPlacement: 'top',
          tabsHighlight: true,
          tabsLayout: 'icon-hide'
        }
      }
    }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    StoreModule.provideStore(rootReducer),
    EffectsModule.run(AppEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(OrganizationEffects),
    EffectsModule.run(KitsEffects),
    EffectsModule.run(KitModelsEffects),
    EffectsModule.run(BrandsEffects),
    EffectsModule.run(ModelsEffects),
    EffectsModule.run(CategoriesEffects),
    EffectsModule.run(ItemsEffects),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StockpileApp,
    AddKitModelPage,
    ChangePasswordPage,
    EditAccountPage,
    EditItemPage,
    EditKitPage,
    HomePage,
    InventoryFilterPage,
    InventoryPage,
    ItemFilterPage,
    KitRentalPage,
    KitsPage,
    LoginPage,
    RentalPage,
    RentalDetailsPage,
    TabsPage,
    ViewAccountPage,
    ViewItemPage,
    ViewKitPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    Api,
    ApiUrl,
    AppActions,
    BarcodeScanner,
    BrandsActions,
    BrandsEffects,
    BrandsService,
    CategoriesActions,
    CategoriesEffects,
    CategoriesService,
    ItemData,
    ItemPropertyData,
    ItemsActions,
    ItemsEffects,
    ItemsService,
    KitData,
    KitsActions,
    KitsEffects,
    KitsService,
    KitModelsActions,
    KitModelsEffects,
    KitModelsService,
    LayoutActions,
    LayoutService,
    MapToIterablePipe,
    ModelsActions,
    ModelsEffects,
    ModelsService,
    Notifications,
    OrganizationActions,
    OrganizationEffects,
    OrganizationService,
    SplashScreen,
    StatusBar,
    UserActions,
    UserEffects,
    UserData,
    UserService,
    Toast,
    { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http, Storage] }
  ]
})
export class AppModule {}
