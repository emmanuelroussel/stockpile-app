import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class ApiUrl {

  constructor(public platform: Platform) { }

  /**
   * Returns full url if on mobile device and relative url to use proxy in
   * browser.
   */
  getUrl() {
    if (this.platform.is('cordova')) {
      return 'https://stockpile.adamvig.com/api';
    } else {
      return '/api';
    }
  }
};
