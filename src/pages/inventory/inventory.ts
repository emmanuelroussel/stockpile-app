import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { StockpileData } from '../../providers/stockpile-data';
import { Statuses, Actions } from '../../constants';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  statuses = Statuses;
  segment = Statuses.all;
  allCategories;
  selectedCategoryIDs;
  allItems;
  filteredItems;

  constructor(
    public navCtrl: NavController,
    public inventoryData: InventoryData,
    public stockpileData: StockpileData
  ) { }

  ngOnInit() {
    this.inventoryData.getCategories().subscribe(
      categories => this.allCategories = categories.results,
      err => this.stockpileData.showToast(err.message)
    );

    this.inventoryData.getAllItems().subscribe(
      items => {
        this.allItems = items.results;
        this.filteredItems = this.allItems;
      },
      err => this.stockpileData.showToast(err.message)
    );
  }

  filterItems() {
    this.inventoryData.filterItems(this.selectedCategoryIDs, this.segment).subscribe(
      items => this.filteredItems = items,
      err => this.stockpileData.showToast(err.message)
    );
  }

  viewItem(item) {
    this.navCtrl.push(ItemPage, {
      tag: item.tag,
      action: Actions.edit
    });
  }
}
