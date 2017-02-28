import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { StockpileData } from '../../providers/stockpile-data';
import { Statuses } from '../../constants';

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
        this.allItems = items;
        this.filteredItems = this.allItems;
      },
      err => this.stockpileData.showToast(err.message)
    );
  }

  filterItems() {
    // Filter by categories
    this.filteredItems = this.allItems.filter((item) => {
      return this.selectedCategoryIDs.find(categoryID => categoryID === item.categoryID);
    });

    if (this.segment !== this.statuses.all) {
      // Filter by status
      this.filteredItems = this.filteredItems.filter((item) => {
        return item.status.toLowerCase() === this.segment.toLowerCase();
      });
    }
  }
}
