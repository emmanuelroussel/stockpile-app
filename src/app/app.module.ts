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
import { AuthHttp } from 'angular2-jwt';
import { StockpileApp } from './app.component';

import { AddKitItemPage } from '../pages/add-kit-item/add-kit-item';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { EditKitPage } from '../pages/edit-kit/edit-kit';
import { HomePage } from '../pages/home/home';
import { InventoryFilterPage } from '../pages/inventory-filter/inventory-filter';
import { InventoryPage } from '../pages/inventory/inventory';
import { ItemFilterPage } from '../pages/item-filter/item-filter';
import { KitsPage } from '../pages/kits/kits';
import { LoginPage } from '../pages/login/login';
import { RentalPage } from '../pages/rental/rental';
import { RentalDetailsPage } from '../pages/rental-details/rental-details';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewAccountPage } from '../pages/view-account/view-account';
import { ViewItemPage } from '../pages/view-item/view-item';
import { ViewKitPage } from '../pages/view-kit/view-kit';

import { Api } from '../providers/api';
import { ApiUrl } from '../providers/api-url';
import { ItemData } from '../providers/item-data';
import { ItemPropertyData } from '../providers/item-property-data';
import { KitData } from '../providers/kit-data';
import { Notifications } from '../providers/notifications';
import { UserData } from '../providers/user-data';

import { RavenErrorHandler } from '../services/raven-error-handler';
import { getAuthHttp, cloudSettings } from '../services/auth-http-helpers';

@NgModule({
  declarations: [
    StockpileApp,
    AddKitItemPage,
    ChangePasswordPage,
    EditAccountPage,
    EditItemPage,
    EditKitPage,
    HomePage,
    InventoryFilterPage,
    InventoryPage,
    ItemFilterPage,
    KitsPage,
    LoginPage,
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
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StockpileApp,
    AddKitItemPage,
    ChangePasswordPage,
    EditAccountPage,
    EditItemPage,
    EditKitPage,
    HomePage,
    InventoryFilterPage,
    InventoryPage,
    ItemFilterPage,
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
    ItemData,
    ItemPropertyData,
    KitData,
    Notifications,
    UserData,
    SplashScreen,
    StatusBar,
    BarcodeScanner,
    Toast,
    { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http, Storage] }
  ]
})
export class AppModule {}
