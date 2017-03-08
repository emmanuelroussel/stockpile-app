import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { StockpileData } from '../../providers/stockpile-data';
import { Actions } from '../../constants';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  segment = -1;
  allBrands;
  selectedBrandID = -1;
  allModels;
  filteredModels;
  selectedModelID = -1;
  allCategories;
  selectedCategoryID = -1;
  allItems;
  filteredItems;

  constructor(
    public navCtrl: NavController,
    public inventoryData: InventoryData,
    public stockpileData: StockpileData
  ) { }

  ngOnInit() {
    this.inventoryData.getBrands().subscribe(
      (brands: any) => this.allBrands = brands.results,
      err => this.stockpileData.showToast(err)
    );

    this.inventoryData.getModels().subscribe(
      (models: any) => this.allModels = models.results,
      err => this.stockpileData.showToast(err)
    );

    this.inventoryData.getCategories().subscribe(
      (categories: any) => this.allCategories = categories.results,
      err => this.stockpileData.showToast(err)
    );

    this.inventoryData.getAllItems().subscribe(
      (items: any) => {
        this.allItems = items.results;
        this.filteredItems = this.allItems;
      },
      err => this.stockpileData.showToast(err)
    );
  }

  filterItems() {
    this.filterModels();

    if (Math.sign(this.selectedBrandID) < 0) {
      this.selectedModelID = -1;
    }

    this.inventoryData.filterItems(
      this.selectedBrandID,
      this.selectedModelID,
      this.selectedCategoryID,
      this.segment
    ).subscribe(
      (items: any) => {
        this.filteredItems = items.results;
      },
      err => this.stockpileData.showToast(err)
    );
  }

  filterModels() {
    this.filteredModels = this.allModels.filter((model) => {
      return (model.brandID === this.selectedBrandID);
    });
  }

  viewItem(item) {
    this.navCtrl.push(ItemPage, {
      tag: item.tag,
      action: Actions.edit
    });
  }

  onAdd() {
    this.stockpileData.scan().then(
      barcodeData => {
        this.navCtrl.push(ItemPage, {
          tag: barcodeData.text,
          action: Actions.add
        });
      },
      err => this.stockpileData.showToast(err.message)
    );
  }
}
