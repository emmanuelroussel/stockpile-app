import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { InventoryData } from '../../providers/inventory-data';
import { ItemPage } from '../item/item';
import { RentalDetailsPage } from '../rental-details/rental-details';
import { Actions } from '../../constants';

@Component({
  selector: 'page-rental',
  templateUrl: 'rental.html'
})
export class RentalPage {
  actions = Actions;
  tag: string = '';
  action: Actions = '';
  items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData
  ) { }

  ngOnInit() {
    this.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    this.onAdd();
  }

  onAdd() {
    this.inventoryData.getItem(this.tag).subscribe(
      item => this.items.push(item),
      err => console.error(err)
    );

    this.tag = '';
  }

  viewItem(item) {
    this.navCtrl.push(ItemPage, {
      tag: item.tag,
      action: this.actions.edit
    });
  }

  onContinue() {
    this.navCtrl.push(RentalDetailsPage, {
      items: this.items
    });
  }

  onReturn() {
    let promises = [];

    for (const item of this.items) {
      promises.push(this.inventoryData.return(item.tag).toPromise());
    }

    Promise.all(promises).then(
      success => this.navCtrl.pop(),
      err => console.error(err)
    );
  }

  onScan() {
    BarcodeScanner.scan().then(
      barcodeData => {
        this.tag = barcodeData.text;
        this.onAdd();
      },
      err => console.error('scan failed: ' + err)
    );
  }
}
