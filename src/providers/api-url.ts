import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class ApiUrl {
  constructor(public platform: Platform) { }
  getUrl() {
    // Core platform is desktop web browser
    if (this.platform.is('cordova')) {
      return 'https://stockpile.adamvig.com/api';
    } else {
      return '/api';
    }
  }
};
