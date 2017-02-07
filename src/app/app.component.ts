import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { StockpileData } from '../providers/stockpile-data';


@Component({
  templateUrl: './app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, public stockpileData: StockpileData) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.stockpileData.initHal();
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
