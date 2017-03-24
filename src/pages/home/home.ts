import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalPage } from '../rental/rental';
import { Actions, Messages } from '../../constants';
import { IonicPlugins } from '../../providers/ionic-plugins';
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
    public ionicPlugins: IonicPlugins,
    public inventoryData: InventoryData,
    public barcodeScanner: BarcodeScanner
  ) { }

  onNext() {
    if (this.tag) {
      this.inventoryData.getItem(this.tag).subscribe(
        (item: any) => this.pushPage(item.available === 1),
        err => this.ionicPlugins.showToast(err)
      );
    }
  }

  pushPage(available: boolean) {
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
              this.pushPage(available);
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
        tag: this.tag,
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
      err => this.ionicPlugins.showToast(err)
    );
  }
}
