import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@Injectable()
export class Notifications {

  constructor(public platform: Platform, public toast: Toast) {}

  /**
   * Shows message as a Toast notification if you are on mobile or logs it to
   * the console when cordova is not be available.
   */
  showToast(message: string) {
    if (this.platform.is('cordova')) {
      this.toast.showWithOptions(
        {
          message,
          duration: 5000,
          position: 'bottom',
          addPixelsY: -50
        }
      ).subscribe(toast => {});
    } else {
      console.log(message);
    }
  }
}
