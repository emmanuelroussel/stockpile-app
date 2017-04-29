import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { Notifications } from '../../providers/notifications';
import { Actions, paginationLimit } from '../../constants';
import { EditKitPage } from '../edit-kit/edit-kit';
import { ViewKitPage } from '../view-kit/view-kit';

@Component({
  selector: 'page-kits',
  templateUrl: 'kits.html'
})
export class KitsPage {
  kits = [];
  loadMoreItems = true;
  offset;

  constructor(
    public navCtrl: NavController,
    public inventoryData: InventoryData,
    public notifications: Notifications,
    public events: Events
  ) { }

  ngOnInit() {
    this.loadKits();

    this.events.subscribe('kit:edited', kit => {
      const index = this.kits.findIndex(element => element.kitID === kit.kitID);
      this.kits.splice(index, 1, kit);
    });

    this.events.subscribe('kit:added', kit => {
      this.kits.push(kit);
    });

    this.events.subscribe('kit:deleted', kit => {
      const index = this.kits.findIndex(element => element.kitID === kit.kitID);
      this.kits.splice(index, 1);
    });
  }

 /**
  * Gets all kits and resolves a promise when done for the infinite scroll
  * component.
  */
  loadKits() {
    return new Promise(resolve => {
      this.inventoryData.getKits(
        paginationLimit,
        this.offset
      ).subscribe(
        (kits: any) => {
          kits.results.forEach(kit => {
            this.kits.push(kit);
          });

          if (!kits.results.length) {
            this.loadMoreItems = false;
          } else {
            this.offset += paginationLimit;
          }

          resolve();
        },
        err => this.notifications.showToast(err)
      );
    });
  }

  viewKit(kit) {
    this.navCtrl.push(ViewKitPage, {
      kit: kit
    });
  }

  onAdd() {
    this.navCtrl.push(EditKitPage, {
      action: Actions.add
    });
  }
}
