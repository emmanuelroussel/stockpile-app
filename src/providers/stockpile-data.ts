import { Injectable } from '@angular/core';
import { Navigator, HalDocument } from 'ng-hal';
import { ApiUrl } from '../constants';
import { Toast } from 'ionic-native';

@Injectable()
export class StockpileData {
  hal: HalDocument;

  constructor(public navigator: Navigator) { }

  initHal() {
    return new Promise((resolve, reject) => {
      this.navigator
        .get(ApiUrl)
        .subscribe((doc: HalDocument) => {
          this.hal = doc;
          resolve();
        });
    });
  }

  getUrl(key: string) {
    // Ugly solution to extract endpoint from the HAL object.
    // The ng-hal library does not support this out of the box,
    // but they are planning on implementing it
    return ApiUrl + this.hal.resource.allLinks()[key][0].href;
  }

  showToast(message: string) {
    Toast.show(message, '5000', 'bottom');
  }
}
