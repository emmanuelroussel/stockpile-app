import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { StockpileData } from '../../providers/stockpile-data';
import { Actions, Messages } from '../../constants';

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
    public inventoryData: InventoryData,
    public stockpileData: StockpileData
  ) { }

  ngOnInit() {
    this.item.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    if (this.action === this.actions.edit) {
      this.inventoryData.getItem(this.item.tag).subscribe(
        item => this.item = item,
        err => this.stockpileData.showToast(err.message)
      );
    }

    this.inventoryData.getBrands().subscribe(
      brands => this.brands = brands.results,
      err => this.stockpileData.showToast(err.message)
    );

    this.inventoryData.getModels().subscribe(
      models => this.models = models.results,
      err => this.stockpileData.showToast(err.message)
    );

    this.inventoryData.getStatuses().subscribe(
      statuses => this.statuses = statuses.results,
      err => this.stockpileData.showToast(err.message)
    );

    this.inventoryData.getCategories().subscribe(
      categories => this.categories = categories.results,
      err => this.stockpileData.showToast(err.message)
    );
  }

  onSave(form: NgForm) {
    if (form.valid) {
      let observable;
      let message;

      if (this.action === this.actions.add) {
        observable = this.inventoryData.addItem(this.item);
        message = Messages.itemAdded;
      } else if (this.action === this.actions.edit) {
        observable = this.inventoryData.editItem(this.item);
        message = Messages.itemEdited;
      }

      observable.subscribe(
        success => {
          this.stockpileData.showToast(message);
          this.navCtrl.pop();
        },
        err => this.stockpileData.showToast(err.message)
      );
    }
  }

  onDelete() {
    this.inventoryData.deleteItem(this.item.tag).subscribe(
      success => {
        this.stockpileData.showToast(Messages.itemDeleted);
        this.navCtrl.pop();
      },
      err => this.stockpileData.showToast(err.message)
    );
  }
}
