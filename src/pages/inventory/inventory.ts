import { Component } from '@angular/core';
import { AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FormControl } from '@angular/forms';

import { ItemData } from '../../providers/item-data';
import { ItemPropertyData } from '../../providers/item-property-data';
import { Notifications } from '../../providers/notifications';
import { Actions } from '../../constants';
import { ItemPage } from '../item/item';
import { InventoryFilterPage } from '../inventory-filter/inventory-filter';
import { Items } from '../../models';
import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  segment = -1;
  selectedBrandID = -1;
  selectedModelID = -1;
  selectedCategoryID = -1;
  queryText: string = '';
  items: Observable<Items>;
  searchControl: FormControl;

  constructor(
    public navCtrl: NavController,
    public itemData: ItemData,
    public itemPropertyData: ItemPropertyData,
    public notifications: Notifications,
    public barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions,
    public brandsActions: BrandsActions,
    public modelsActions: ModelsActions,
    public categoriesActions: CategoriesActions,
    public platform: Platform,
    public alertCtrl: AlertController
  ) {}

  /**
   * Gets brands, models, categories and items.
   */
  ngOnInit() {
    this.searchControl = new FormControl();

    this.items = this.itemsService.getItems();

    this.brandsActions.fetchBrands();
    this.modelsActions.fetchModels();
    this.categoriesActions.fetchCategories();

    // No filters set, so gets all items
    this.itemsActions.fetchItems();
  }

  /**
   * Set Observable to search after a short period of time.
   */
  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(100).subscribe(search => {
      this.loadItems();
    });
  }

  /**
   * Apply current filters and load items.
   */
  onFilterItems() {
    if (Math.sign(this.selectedBrandID) < 0) {
      this.selectedModelID = -1;
    }

    this.itemsActions.resetItems();
    this.loadItems();
  }

 /**
  * Gets all items that match the filters.
  */
  loadItems() {
    this.itemsActions.fetchItems(
      this.selectedBrandID,
      this.selectedModelID,
      this.selectedCategoryID,
      this.segment,
      this.queryText
    );
  }

  /**
   * Pushes page with the item to view.
   */
  onViewItem(barcode: string) {
    this.navCtrl.push(ItemPage, { action: Actions.edit, barcode });
  }

  /**
   * Starts barcode scanner if cordova is available or creates an alert to allow
   * user to enter barcode. Calls pushPage with the input.
   */
  onAdd() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(
        barcodeData => {
          if (!barcodeData.cancelled) {
            this.itemsActions.startCreate(barcodeData.text);
          }
        },
        err => this.notifications.showMessage(err)
      );
    } else {
      let alert = this.alertCtrl.create({
        title: 'Type Barcode',
        inputs: [
          {
            name: 'barcode',
            placeholder: 'Barcode'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Next',
            handler: form => {
              this.itemsActions.startCreate(form.barcode);
            }
          }
        ]
      });

      alert.present();
    }
  }

  /**
   * Creates a modal to allow the user to choose filters. When dismissed, saves
   * the filters and filters the items.
   */
  onOpenFilters(event) {
    let modal = this.modalCtrl.create(InventoryFilterPage, {
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
