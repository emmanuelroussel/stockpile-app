import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';

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
    public inventoryData: InventoryData
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
      let promises = [];

      for (const item of this.items) {
        this.details.itemID = item.itemID;
        promises.push(this.inventoryData.rent(this.details).toPromise());
      }

      Promise.all(promises).then(
        success => this.navCtrl.popToRoot(),
        err => console.error(err)
      );
    }
  }
}
