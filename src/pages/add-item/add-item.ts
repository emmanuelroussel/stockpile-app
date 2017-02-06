import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';
import { InventoryData } from '../../providers/inventory-data';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {
  tag: string = '';
  item: {brand?: string, model?: string, category?: string, cost?: string, condition?: string} = {};
  conditions: Array<string> = ['Good', 'Broken', 'Getting Fixed'];
  categories: Array<string> = ['Camera', 'Stand', 'Cable'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData
  ) {
    this.tag = this.navParams.get('tag');
    this.item.condition = 'Good';
  }

  onSave(form: NgForm) {
    if (form.valid) {
      this.inventoryData.addItem(this.item, this.tag).then(
        (success) => this.navCtrl.pop(),
        (err) => console.error(err)
      );
    }
  }
}
