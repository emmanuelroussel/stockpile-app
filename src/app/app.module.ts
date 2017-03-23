import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import * as Raven from 'raven-js';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { InventoryPage } from '../pages/inventory/inventory';
import { ItemPage } from '../pages/item/item';
import { ItemFilterPage } from '../pages/item-filter/item-filter';
import { LoginPage } from '../pages/login/login';
import { RentalPage } from '../pages/rental/rental';
import { RentalDetailsPage } from '../pages/rental-details/rental-details';
import { TabsPage } from '../pages/tabs/tabs';

import { ApiUrl } from '../providers/api-url';
import { InventoryData } from '../providers/inventory-data';
import { StockpileData } from '../providers/stockpile-data';
import { UserData } from '../providers/user-data';

let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

Raven
  .config('https://a64af160cb8746709c9743f23f666b9b@sentry.io/150943')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InventoryPage,
    ItemPage,
    ItemFilterPage,
    LoginPage,
    RentalPage,
    RentalDetailsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      platforms: {
        android: {
          tabsPlacement: 'top',
          tabsHighlight: true,
          tabsLayout: 'icon-hide'
        }
      }
    }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InventoryPage,
    ItemPage,
    ItemFilterPage,
    LoginPage,
    RentalPage,
    RentalDetailsPage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    ApiUrl,
    InventoryData,
    StockpileData,
    UserData,
    { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] }
  ]
})
export class AppModule {}
