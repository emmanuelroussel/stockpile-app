import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { InventoryData } from '../../providers/inventory-data';
import { Notifications } from '../../providers/notifications';
import { Actions } from '../../constants';
import { EditItemPage } from '../edit-item/edit-item';
import { InventoryFilterPage } from '../inventory-filter/inventory-filter';
import { ViewItemPage } from '../view-item/view-item';

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
  items;
  showFilters = false;
  limit = 10;
  offset;
  loadMoreItems = true;

  constructor(
    public navCtrl: NavController,
    public inventoryData: InventoryData,
    public notifications: Notifications,
    public barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.inventoryData.getBrands().subscribe(
      (brands: any) => this.allBrands = brands.results,
      err => this.notifications.showToast(err)
    );

    this.inventoryData.getModels().subscribe(
      (models: any) => this.allModels = models.results,
      err => this.notifications.showToast(err)
    );

    this.inventoryData.getCategories().subscribe(
      (categories: any) => this.allCategories = categories.results,
      err => this.notifications.showToast(err)
    );

    // No filters set, so gets all items
    this.filterItems();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  filterItems() {
    if (Math.sign(this.selectedBrandID) < 0) {
      this.selectedModelID = -1;
    }

    this.items = [];
    this.offset = 0;
    this.loadMoreItems = true;
    this.loadItems();
  }

 /**
  * Gets all items that match the filters and resolves a promise when done
  * for the infinite scroll component.
  */
  loadItems() {
    return new Promise(resolve => {
      this.inventoryData.filterItems(
        this.selectedBrandID,
        this.selectedModelID,
        this.selectedCategoryID,
        this.segment,
        this.limit,
        this.offset
      ).subscribe(
        (items: any) => {
          items.results.forEach(item => {
            this.items.push(item);
          });

          if (!items.results.length) {
            this.loadMoreItems = false;
          } else {
            this.offset += this.limit;
          }

          resolve();
        },
        err => this.notifications.showToast(err)
      );
    });
  }

  viewItem(item) {
    this.navCtrl.push(ViewItemPage, {
      item: item
    });
  }

  onAdd() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.navCtrl.push(EditItemPage, {
            barcode: barcodeData.text,
            action: Actions.add
          });
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  onOpenFilters(event) {
    let modal = this.modalCtrl.create(InventoryFilterPage, {
      brands: this.allBrands,
      models: this.allModels,
      categories: this.allCategories,
      selectedBrandID: this.selectedBrandID,
      selectedModelID: this.selectedModelID,
      selectedCategoryID: this.selectedCategoryID
    });

    modal.onDidDismiss((ids) => {
      if (ids) {
        this.selectedBrandID = ids.selectedBrandID;
        this.selectedModelID = ids.selectedModelID;
        this.selectedCategoryID = ids.selectedCategoryID;
        this.filterItems();
      }
   });

    modal.present({
      ev: event
    });
  }
}
