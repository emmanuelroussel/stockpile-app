import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  submitted = false;

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

  onRent(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // Transform date from ISO 8601 to MySQL date format
      this.details.startDate = new Date(this.details.startDate).toISOString().substring(0, 10);
      this.details.endDate = new Date(this.details.endDate).toISOString().substring(0, 10);

      let rentals = [];

      for (const item of this.items) {
        this.details.itemID = item.itemID;
        rentals.push(this.inventoryData.rent(this.details).toPromise());
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
}
