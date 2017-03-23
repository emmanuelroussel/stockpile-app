import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { IonicPlugins } from '../../providers/ionic-plugins';
import { ItemPage } from '../item/item';
import { RentalDetailsPage } from '../rental-details/rental-details';
import { Actions, Messages } from '../../constants';

@Component({
  selector: 'page-rental',
  templateUrl: 'rental.html'
})
export class RentalPage {
  actions = Actions;
  tag: string = '';
  action: Actions = '';
  items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData,
    public ionicPlugins: IonicPlugins,
    public events: Events
  ) { }

  ngOnInit() {
    this.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    this.events.subscribe('item:edited', tag => {
      const index = this.items.findIndex(item => item.tag === tag);

      this.inventoryData.getItem(tag).subscribe(
        item => this.items.splice(index, 1, item),
        err => this.ionicPlugins.showToast(err)
      );
    });

    this.onAdd();
  }

  onAdd() {
    this.inventoryData.getItem(this.tag).subscribe(
      item => {
        if (item.available === 0 && this.action === Actions.rent) {
          this.ionicPlugins.showToast(Messages.itemAlreadyRented);
        } else if (item.available === 1 && this.action === Actions.return) {
          this.ionicPlugins.showToast(Messages.itemNotRented);
        } else if (this.items.some(listItem => listItem.tag === item.tag)) {
          this.ionicPlugins.showToast(Messages.itemAlreadyAdded);
        } else {
          this.items.push(item);
        }
      },
      err => this.ionicPlugins.showToast(err)
    );

    this.tag = '';
  }

  viewItem(item) {
    this.navCtrl.push(ItemPage, {
      tag: item.tag,
      action: this.actions.edit
    });
  }

  onContinue() {
    this.navCtrl.push(RentalDetailsPage, {
      items: this.items
    });
  }

  onReturn() {
    let returns = [];

    for (const item of this.items) {
      returns.push(this.inventoryData.return(item.tag).toPromise());
    }

    Promise.all(returns).then(
      success => {
        this.ionicPlugins.showToast(Messages.itemsReturned);
        this.navCtrl.pop();
      },
      err => this.ionicPlugins.showToast(err)
    );
  }

  onScan() {
    this.ionicPlugins.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.tag = barcodeData.text;
          this.onAdd();
        }
      },
      err => this.ionicPlugins.showToast(err)
    );
  }
}
