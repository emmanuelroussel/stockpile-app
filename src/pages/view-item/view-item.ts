import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';

import { Actions } from '../../constants';
import { Notifications } from '../../providers/notifications';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html'
})
export class ViewItemPage {
  item;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData,
    public notifications: Notifications,
    public platform: Platform
  ) { }

  ngOnInit() {
    const barcode = this.navParams.get('barcode');

    this.inventoryData.getItem(barcode).subscribe(
      (item: any) => {
        this.item = item;
      },
      err => this.notifications.showToast(err)
    );
  }

  editItem() {
    this.navCtrl.push(ItemPage, {
      barcode: this.item.barcode,
      action: Actions.edit
    });
  }
}
