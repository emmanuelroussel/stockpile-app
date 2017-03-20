import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class ApiUrl {
  constructor(public platform: Platform) { }
  getUrl() {
    // Core platform is desktop web browser
    if (this.platform.is('core')) {
      return '/api';
    } else {
      return 'https://stockpile.adamvig.com/api';
    }
  }
};
