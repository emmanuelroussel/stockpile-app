import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalPage } from '../rental/rental';
import { Actions, Messages } from '../../constants';
import { Notifications } from '../../providers/notifications';
import { InventoryData } from '../../providers/inventory-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  actions = Actions;
  segment: Actions = this.actions.rent;
  tag: string = '';

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public notifications: Notifications,
    public inventoryData: InventoryData,
    public barcodeScanner: BarcodeScanner
  ) { }

  onNext() {
    if (this.tag) {
      this.inventoryData.getItem(this.tag).subscribe(
        (item: any) => this.pushPage(item, item.available === 1),
        err => this.notifications.showToast(err)
      );
    }
  }

  pushPage(item, available: boolean) {
    if (this.segment === this.actions.rent && !available) {
      let alert = this.alertCtrl.create({
        title: Messages.itemAlreadyRented,
        message: 'Do you want to return it instead?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Return Item',
            handler: () => {
              this.segment = this.actions.return;
              this.pushPage(item, available);
            }
          }
        ]
      });

      alert.present();
    } else if (this.segment === this.actions.return && available) {
      let alert = this.alertCtrl.create({
        title: Messages.itemNotRented,
        subTitle: 'Cannot return the item',
        buttons: ['OK']
      });

      alert.present();
    } else {
      this.navCtrl.push(RentalPage, {
        item,
        action: this.segment
      });

      this.segment = this.actions.rent;
      this.tag = '';
    }
  }

  onScan() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.tag = barcodeData.text;
          this.onNext();
        }
      },
      err => this.notifications.showToast(err)
    );
  }
}
