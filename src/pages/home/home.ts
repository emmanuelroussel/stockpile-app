import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { ItemPage } from '../item/item';
import { RentalPage } from '../rental/rental';
import { Actions, Statuses, Messages } from '../../constants';
import { StockpileData } from '../../providers/stockpile-data';
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
    public stockpileData: StockpileData,
    public inventoryData: InventoryData
  ) { }

  onNext() {
    if (this.tag) {
      if (this.segment === this.actions.add) {
        this.pushPage('');
      } else {
        this.inventoryData.getStatus(this.tag).subscribe(
          res => this.pushPage(res.status),
          err => this.stockpileData.showToast(err.message)
        );
      }
    }
  }

  pushPage(status: string) {
    let page;

    if (this.segment === this.actions.rent && status.toLowerCase() === Statuses.rented.toLowerCase()) {
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
              this.pushPage(status);
            }
          }
        ]
      });

      alert.present();
    } else if (this.segment === this.actions.return && status.toLowerCase() === Statuses.available.toLowerCase()) {
      let alert = this.alertCtrl.create({
        title: Messages.itemNotRented,
        subTitle: 'Cannot return the item',
        buttons: ['OK']
      });

      alert.present();
    } else {
      if (this.segment === this.actions.rent || this.segment === this.actions.return) {
        page = RentalPage;
      } else if (this.segment === this.actions.edit || this.segment === this.actions.add) {
        page = ItemPage;
      }

      this.navCtrl.push(page, {
        tag: this.tag,
        action: this.segment
      });

      this.segment = this.actions.rent;
      this.tag = '';
    }
  }

  onScan() {
    BarcodeScanner.scan().then(
      barcodeData => {
        this.tag = barcodeData.text;
        this.onNext();
      },
      err => this.stockpileData.showToast(err.message)
    );
  }
}
