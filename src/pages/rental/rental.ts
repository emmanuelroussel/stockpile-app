import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { InventoryData } from '../../providers/inventory-data';
import { Notifications } from '../../providers/notifications';
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
    public notifications: Notifications,
    public events: Events,
    public barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    this.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    this.events.subscribe('item:edited', tag => {
      const index = this.items.findIndex(item => item.tag === tag);

      this.inventoryData.getItem(tag).subscribe(
        item => this.items.splice(index, 1, item),
        err => this.notifications.showToast(err)
      );
    });

    this.onAdd();
  }

  onAdd() {
    this.inventoryData.getItem(this.tag).subscribe(
      item => {
        if (item.available === 0 && this.action === Actions.rent) {
          this.notifications.showToast(Messages.itemAlreadyRented);
        } else if (item.available === 1 && this.action === Actions.return) {
          this.notifications.showToast(Messages.itemNotRented);
        } else if (this.items.some(listItem => listItem.tag === item.tag)) {
          this.notifications.showToast(Messages.itemAlreadyAdded);
        } else {
          this.items.push(item);
        }
      },
      err => this.notifications.showToast(err)
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
        this.notifications.showToast(Messages.itemsReturned);
        this.navCtrl.pop();
      },
      err => this.notifications.showToast(err)
    );
  }

  onScan() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.tag = barcodeData.text;
          this.onAdd();
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  onRemoveItem(tag) {
    const index = this.items.findIndex((item) => {
      return (item.tag === tag);
    });

    this.items.splice(index, 1);
  }
}
