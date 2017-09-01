import { Component } from '@angular/core';
import { NavController, ModalController, Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ItemData } from '../../providers/item-data';
import { ItemPropertyData } from '../../providers/item-property-data';
import { Notifications } from '../../providers/notifications';
import { Actions } from '../../constants';
import { EditItemPage } from '../edit-item/edit-item';
import { InventoryFilterPage } from '../inventory-filter/inventory-filter';
import { Items } from '../../models/items';
import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  segment = -1;
  selectedBrandID = -1;
  selectedModelID = -1;
  selectedCategoryID = -1;
  items: Observable<Items>;
  loadMoreItems: Observable<boolean>;
  showAddNew: Observable<boolean>;

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
    this.items = this.itemsService.getItems();
    this.showAddNew = this.itemsService.getShouldShowAddNew();
    this.loadMoreItems = this.itemsService.getShouldLoadMoreItems();

    this.brandsActions.fetchBrands();
    this.modelsActions.fetchModels();
    this.categoriesActions.fetchCategories();

    // No filters set, so gets all items
    this.itemsActions.fetchItems();
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
      this.segment
    );
  }

  /**
   * Pushes page with the item to view.
   */
  onViewItem(barcode: string) {
    this.navCtrl.push(EditItemPage, { action: Actions.edit, barcode });
  }

  /**
   * Pushes page with the barcode to create.
   */
  pushPage(barcode: string) {
    this.navCtrl.push(EditItemPage, {
      barcode,
      action: Actions.add
    });
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
            this.pushPage(barcodeData.text);
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
              this.pushPage(form.barcode);
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
