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

  /**
   * Gets kit and kit items and listens to event to update kit if it is
   * modified.
   */
  ngOnInit() {
    this.kit = this.navParams.get('kit');
    this.getKitItems();

    this.events.subscribe('kit:edited', kit => {
      this.kit = kit;
      this.getKitItems();
    });
  }

  /**
   * Calls api to get items in the kit.
   */
  private getKitItems() {
    this.inventoryData.getKitItems(this.kit.kitID).subscribe(
      kitItems => this.kitItems = kitItems.results,
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Pushes EditKitPage on nav with the kit and items.
   */
  onEditKit() {
    this.navCtrl.push(EditKitPage, {
      // Copies kit and kitItems to pass by value, because modifying the kit or
      // the items in it without saving would also modify this local copy
      kit: Object.assign({}, this.kit),
      kitItems: this.kitItems.slice(),
      action: Actions.edit
    });
  }
}
