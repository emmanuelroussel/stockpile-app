import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ItemPage } from '../item/item';
import { RentalPage } from '../rental/rental';
import { Actions, Messages } from '../../constants';
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
      this.inventoryData.getItem(this.tag).subscribe(
        item => this.pushPage(item.available === 1),
        err => this.stockpileData.showToast(err.message)
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
      let page;

      if (this.segment === this.actions.rent || this.segment === this.actions.return) {
        page = RentalPage;
      } else if (this.segment === this.actions.edit) {
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
    this.stockpileData.scan().then(
      barcodeData => {
        this.tag = barcodeData.text;
        this.onNext();
      },
      err => this.stockpileData.showToast(err.message)
    );
  }
}
