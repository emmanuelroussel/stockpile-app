import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { Actions } from '../../constants';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  actions = Actions;
  action: Actions = '';
  item: {brandID?: number, modelID?: number, categoryID?: number, statusID?: number, tag?: string} = {};
  brands;
  models;
  statuses;
  categories;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData
  ) { }

  ngOnInit() {
    this.item.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    if (this.action === this.actions.edit) {
      this.inventoryData.getItem(this.item.tag).subscribe(
        item => this.item = item,
        err => console.error(err)
      );
    }

    this.inventoryData.getBrands().subscribe(
      brands => this.brands = brands,
      err => console.log(err)
    );

    this.inventoryData.getModels().subscribe(
      models => this.models = models,
      err => console.log(err)
    );

    this.inventoryData.getStatuses().subscribe(
      statuses => this.statuses = statuses,
      err => console.log(err)
    );

    this.inventoryData.getCategories().subscribe(
      categories => this.categories = categories,
      err => console.log(err)
    );
  }

  onSave(form: NgForm) {
    if (form.valid) {
      if (this.action === this.actions.add) {
        this.inventoryData.addItem(this.item).subscribe(
          success => this.navCtrl.pop(),
          err => console.error(err)
        );
      } else if (this.action === this.actions.edit) {
        this.inventoryData.editItem(this.item).subscribe(
          success => this.navCtrl.pop(),
          err => console.error(err)
        );
      }
    }
  }

  onDelete() {
    this.inventoryData.deleteItem(this.item.tag).subscribe(
      success => this.navCtrl.pop(),
      err => console.error(err)
    );
  }
}
