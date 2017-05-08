import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ItemData } from '../../providers/item-data';
import { Notifications } from '../../providers/notifications';
import { Messages } from '../../constants';

@Component({
  selector: 'page-rental-details',
  templateUrl: 'rental-details.html'
})
export class RentalDetailsPage {
  items = [];
  details: {itemID?: number, startDate?: string, endDate?: string} = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemData: ItemData,
    public notifications: Notifications,
    public loadingCtrl: LoadingController
  ) { }

  /**
   * Gets items to rent and sets the rental's start date as today and return
   * date to tomorrow as default.
   */
  ngOnInit() {
    this.items = this.navParams.get('items');

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.details.startDate = today.toISOString();
    this.details.endDate = tomorrow.toISOString();
  }

  /**
   * Rents items by calling the api for each item in the list of items to rent.
   * Pops the nav back to the root (TabsPage) when done.
   */
  onRent() {
    // Transform date from ISO 8601 to MySQL date format
    this.details.startDate = new Date(this.details.startDate).toISOString().substring(0, 10);
    this.details.endDate = new Date(this.details.endDate).toISOString().substring(0, 10);

    let loading = this.loadingCtrl.create({
      content: 'Renting your item(s), please wait...'
    });

    loading.present();

    let rentals = [];

    for (const item of this.items) {
      const rental = {
        barcode: item.barcode,
        startDate: this.details.startDate,
        endDate: this.details.endDate
      };

      rentals.push(this.itemData.rent(rental).toPromise());
    }

    Promise.all(rentals).then(
      success => {
        this.notifications.showToast(Messages.itemsRented);
        loading.dismiss();
        this.navCtrl.popToRoot();
      },
      err => {
        loading.dismiss();
        this.notifications.showToast(err);
      }
    );
  }
}
