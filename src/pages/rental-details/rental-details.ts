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
  }

  onRent(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.details.itemID = this.items[0].itemID;
      this.inventoryData.rent(this.details).subscribe(
        success => this.navCtrl.popToRoot(),
        err => console.error(err)
      );
    }
  }
}
