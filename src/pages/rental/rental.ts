import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InventoryData } from '../../providers/inventory-data';
import { ItemPage } from '../item/item';
import { Actions } from '../../constants';

@Component({
  selector: 'page-rental',
  templateUrl: 'rental.html'
})
export class RentalPage {
  actions = Actions;
  tag: string = '';
  action: Actions = '';
  items: Array<Object> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData
  ) { }

  ngOnInit() {
    this.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    this.onAdd();
  }

  onAdd() {
    this.inventoryData.getItem(this.tag).then(
      item => this.items.push(item),
      err => console.error(err)
    );

    this.tag = '';
  }

  viewItem(item) {
    this.navCtrl.push(ItemPage, {
      tag: item.tag,
      action: this.actions.edit
    });
  }
}
