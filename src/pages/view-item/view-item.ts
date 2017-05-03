import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';

import { Actions } from '../../constants';
import { InventoryData } from '../../providers/inventory-data';
import { Notifications } from '../../providers/notifications';
import { EditItemPage } from '../edit-item/edit-item';

@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html'
})
export class ViewItemPage {
  item;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public events: Events,
    public inventoryData: InventoryData,
    public notifications: Notifications
  ) { }

  /**
   * Gets item and listens to event to update item if it is modified.
   */
  ngOnInit() {
    this.item = this.navParams.get('item');

    this.events.subscribe('item:edited', barcode => {
      this.inventoryData.getItem(barcode).subscribe(
        item => this.item = item,
        err => this.notifications.showToast(err)
      );
    });
  }

  /**
   * Pushes EditItemPage on nav with item.
   */
  onEditItem() {
    this.navCtrl.push(EditItemPage, {
      item: this.item,
      action: Actions.edit
    });
  }
}
