import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { Notifications } from '../../providers/notifications';
import { Messages } from '../../constants';

@Component({
  selector: 'page-rental-details',
  templateUrl: 'rental-details.html'
})
export class RentalDetailsPage {
  items = [];
  details: {itemID?: string, startDate?: string, endDate?: string} = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData,
    public notifications: Notifications
  ) { }

  ngOnInit() {
    this.items = this.navParams.get('items');

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.details.startDate = today.toISOString();
    this.details.endDate = tomorrow.toISOString();
  }

  onRent() {
    // Transform date from ISO 8601 to MySQL date format
    this.details.startDate = new Date(this.details.startDate).toISOString().substring(0, 10);
    this.details.endDate = new Date(this.details.endDate).toISOString().substring(0, 10);

    let rentals = [];

    for (const item of this.items) {
      const rental = {
        itemID: item.itemID,
        startDate: this.details.startDate,
        endDate: this.details.endDate
      };

      rentals.push(this.inventoryData.rent(rental).toPromise());
    }

    Promise.all(rentals).then(
      success => {
        this.notifications.showToast(Messages.itemsRented);
        this.navCtrl.popToRoot();
      },
      err => this.notifications.showToast(err)
    );
  }
}
