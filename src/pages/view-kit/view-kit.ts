import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';

import { Actions } from '../../constants';
import { EditKitPage } from '../edit-kit/edit-kit';
import { InventoryData } from '../../providers/inventory-data';
import { Notifications } from '../../providers/notifications';

@Component({
  selector: 'page-view-kit',
  templateUrl: 'view-kit.html'
})
export class ViewKitPage {
  kit;
  kitItems = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public notifications: Notifications,
    public inventoryData: InventoryData,
    public events: Events
  ) { }

  ngOnInit() {
    this.kit = this.navParams.get('kit');
    this.getKitItems();

    this.events.subscribe('kit:edited', () => {
      this.getKitItems();
    });
  }

  private getKitItems() {
    this.inventoryData.getKitItems(this.kit.kitID).subscribe(
      kitItems => this.kitItems = kitItems.results,
      err => this.notifications.showToast(err)
    );
  }

  onEditKit() {
    this.navCtrl.push(EditKitPage, {
      kit: this.kit,
      kitItems: this.kitItems,
      action: Actions.edit
    });
  }
}
