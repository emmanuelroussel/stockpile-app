import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';
import { InventoryData } from '../../providers/inventory-data';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  tag: string = '';
  action: string = '';
  item: {brand?: string, model?: string, category?: string, cost?: string, condition?: string} = {};
  conditions: Array<string> = ['Good', 'Broken', 'Getting Fixed'];
  categories: Array<string> = ['Camera', 'Stand', 'Cable'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData
  ) {
    this.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');
    this.item.condition = 'Good';

    this.inventoryData.getItem(this.tag).then(
      item => this.item = item,
      err => console.error(err)
    );
  }

  onSave(form: NgForm) {
    if (form.valid) {
      if (this.action === 'Add') {
        this.inventoryData.addItem(this.item, this.tag).then(
          success => this.navCtrl.pop(),
          err => console.error(err)
        );
      } else if (this.action === 'Edit') {
        this.inventoryData.editItem(this.item, this.tag).then(
          success => this.navCtrl.pop(),
          err => console.error(err)
        );
      }
    }
  }

  onDelete() {
    this.inventoryData.deleteItem(this.tag).then(
      success => this.navCtrl.pop(),
      err => console.error(err)
    );
  }
}
