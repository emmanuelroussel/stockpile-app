import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ItemData } from '../../providers/item-data';
import { ItemPropertyData } from '../../providers/item-property-data';
import { Notifications } from '../../providers/notifications';
import { Actions, paginationLimit } from '../../constants';
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
  offset;
  loadMoreItems = true;
  loading = false;
  showAdd = true;

  constructor(
    public navCtrl: NavController,
    public itemData: ItemData,
    public itemPropertyData: ItemPropertyData,
    public notifications: Notifications,
    public barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController
  ) { }

  /**
   * Gets brands, models, categories and all items in inventory. Uses
   * ionViewWillEnter() instead of ngOnInit() because the content of the page
   * has to be reloaded whenever an item is changed (edited, rented, etc.).
   * Instead of listening to all of those events, this reloads the page whenever
   * the user enters it.
   */
  ionViewWillEnter() {
    this.itemPropertyData.getBrands().subscribe(
      (brands: any) => this.allBrands = brands.results,
      err => this.notifications.showToast(err)
    );

    this.itemPropertyData.getModels().subscribe(
      (models: any) => this.allModels = models.results,
      err => this.notifications.showToast(err)
    );

    this.itemPropertyData.getCategories().subscribe(
      (categories: any) => this.allCategories = categories.results,
      err => this.notifications.showToast(err)
    );

    // No filters set, so gets all items
    this.onFilterItems();
  }

  /**
   * Apply current filters on items by calling loadItems().
   */
  onFilterItems() {
    this.loading = true;
    if (Math.sign(this.selectedBrandID) < 0) {
      this.selectedModelID = -1;
    }

    this.items = [];
    this.offset = 0;
    this.loadMoreItems = true;
    this.loadItems().then(
      () => this.loading = false
    );
  }

 /**
  * Gets all items that match the filters and resolves a promise when done
  * for the infinite scroll component.
  */
  loadItems() {
    return new Promise(resolve => {
      this.itemData.filterItems(
        this.selectedBrandID,
        this.selectedModelID,
        this.selectedCategoryID,
        this.segment,
        paginationLimit,
        this.offset
      ).subscribe(
        (items: any) => {
          items.results.forEach(item => {
            this.items.push(item);
          });

          if (!items.results.length) {
            this.loadMoreItems = false;
          } else {
            this.offset += paginationLimit;
            this.showAdd = false;
          }

          resolve();
        },
        err => this.notifications.showToast(err)
      );
    });
  }

  /**
   * Pushes ViewItemPage with the item to view.
   */
  onViewItem(item) {
    this.navCtrl.push(ViewItemPage, {
      item: item
    });
  }

  /**
   * Starts barcode scanner and pushes EditItemPage  on navto create the item if
   * it got a barcode.
   */
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

  /**
   * Creates a modal to allow the user to choose filters. When dismissed, saves
   * the filters and filters the items.
   */
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
        this.onFilterItems();
      }
   });

    modal.present({
      ev: event
    });
  }
}
