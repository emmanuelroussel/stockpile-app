import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StockpileData } from '../providers/stockpile-data';
import { UserData } from '../providers/user-data';


@Component({
  templateUrl: './app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    public platform: Platform,
    public stockpileData: StockpileData,
    public userData: UserData
  ) { }

  ngOnInit() {
    this.stockpileData.initHal().then(() => {
      this.userData.isLoggedIn().then(loggedIn => {
        if (loggedIn) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }

        this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          StatusBar.styleDefault();
          Splashscreen.hide();
        });
      });
    });
  }
}
