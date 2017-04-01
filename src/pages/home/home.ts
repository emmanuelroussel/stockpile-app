import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalPage } from '../rental/rental';
import { Actions } from '../../constants';
import { Notifications } from '../../providers/notifications';
import { InventoryData } from '../../providers/inventory-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public notifications: Notifications,
    public inventoryData: InventoryData,
    public barcodeScanner: BarcodeScanner,
    public platform: Platform
  ) { }

  pushPage(barcode: string) {
    this.inventoryData.getItem(barcode).subscribe(
      (item: any) => {
        let action;

        // If item is not available (i.e. rented), return it
        // Else, if item is available, rent it
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
