import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalPage } from '../rental/rental';
import { Actions } from '../../constants';
import { Notifications } from '../../providers/notifications';
import { ItemData } from '../../providers/item-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public notifications: Notifications,
    public itemData: ItemData,
    public barcodeScanner: BarcodeScanner,
    public platform: Platform
  ) { }

  /**
   * Decide whether the item should be rented or returned based on whether it is
   * available or not and push RentalPage with the corresponding action.
   */
  pushPage(barcode: string) {
    this.itemData.getItem(barcode).subscribe(
      (item: any) => {
        let action;

        // 0 = false, item is currently rented
        // 1 = true, item is available
        if (item.available === 0) {
          action = Actions.return;
        } else {
          action = Actions.rent;
        }

        this.navCtrl.push(RentalPage, {
          item,
          action
        });
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Starts barcode scanner and calls pushPage() with the barcode if it got a
   * barcode.
   */
  onScanBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.pushPage(barcodeData.text);
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Creates alert for user to enter a barcode and calls pushPage() with the
   * barcode when user taps 'Next'.
   */
  onTypeBarcode() {
    let alert = this.alertCtrl.create({
      title: 'Type Barcode',
      inputs: [
        {
          name: 'barcode',
          placeholder: 'Barcode'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Next',
          handler: form => {
            this.pushPage(form.barcode);
          }
        }
      ]
    });

    alert.present();
  }
}
