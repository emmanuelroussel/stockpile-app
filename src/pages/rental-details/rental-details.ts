import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { InventoryData } from '../../providers/inventory-data';

@Component({
  selector: 'page-rental-details',
  templateUrl: 'rental-details.html'
})
export class RentalDetailsPage {
  items: Array<Object> = [];
  details: {person?: string, purpose?: string, date?: string} = {};
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
      this.inventoryData.rent(this.items, this.details).then(
        success => this.navCtrl.popToRoot(),
        err => console.error(err)
      );
    }
  }
}
