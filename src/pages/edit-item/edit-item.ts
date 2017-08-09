import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';

import { Actions, ItemProperties, LoadingMessages } from '../../constants';
import { ItemFilterPage } from '../item-filter/item-filter';
import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html'
})
export class EditItemPage {
  actions = Actions;
  itemProperties = ItemProperties;
  action: Actions = '';
  tempItem: Observable<any>;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public itemsActions: ItemsActions,
    public itemsService: ItemsService,
    public brandsActions: BrandsActions,
    public modelsActions: ModelsActions,
    public categoriesActions: CategoriesActions,
    public layoutActions: LayoutActions
  ) {}

  /**
   * Gets action (add or edit) and fetches brands, models and categories. If
   * action is edit, update the temp item to the item that is being modified.
   * If action is add, update the temp item with the barcode.
   */
  ngOnInit() {
    this.brandsActions.fetchBrands();
    this.modelsActions.fetchModels();
    this.categoriesActions.fetchCategories();
    this.tempItem = this.itemsService.getTempItem();

    this.action = this.navParams.get('action');
    const barcode = this.navParams.get('barcode');

    if (this.action === Actions.add) {
      this.itemsActions.updateTempItem({ barcode });
    } else if (this.action === Actions.edit) {
      let item;
      this.itemsService.getItem(barcode).take(1).subscribe(i => item = i);

      this.itemsActions.updateTempItem({
        brand: item.brand,
        brandID: item.brandID,
        model: item.model,
        modelID: item.modelID,
        category: item.category,
        categoryID: item.categoryID,
        barcode: item.barcode
      });
    }
  }

  /**
   * Updates or creates item depending on the action.
   */
  onSave() {
    let item;
    this.tempItem.take(1).subscribe(i => item = {
      modelID: i.modelID,
      categoryID: i.categoryID,
      barcode: i.barcode
    });

    if (this.action === Actions.add) {
      this.layoutActions.showLoadingMessage(LoadingMessages.creatingItem);
      this.itemsActions.createItem(item);
    } else if (this.action === Actions.edit) {
      this.layoutActions.showLoadingMessage(LoadingMessages.updatingItem);
      this.itemsActions.updateItem(item);
    }
  }

  /**
   * Deletes the item.
   */
  onDelete() {
    let barcode;
    this.tempItem.take(1).subscribe(i => barcode = i.barcode);
    this.layoutActions.showLoadingMessage(LoadingMessages.deletingItem);
    this.itemsActions.deleteItem(barcode);
  }

  /**
   * Presents a modal to allow the user to choose a brand, model or category.
   * When dismissed, updates the temp item with the new data.
   */
  onPresentModal(type) {
    let brandID;
    this.tempItem.take(1).subscribe(i => brandID = i.brandID);

    let modal = this.modalCtrl.create(ItemFilterPage, { type, brandID });

    modal.onDidDismiss(element => {
      // If user cancelled, element will be undefined
      if (element) {
        this.updateTempItem(type, element);
      }
   });

    modal.present();
  }

  /**
   * Updates the item with the new brand, model or category.
   */
  updateTempItem(type, element) {
    switch (type) {
      case ItemProperties.brand:
        // Since models are linked to a brand, also reset model when brand changes.
        this.itemsActions.updateTempItem({
          brandID: element.brandID,
          brand: element.name,
          modelID: null,
          model: ''
        });
        break;
      case ItemProperties.model:
        this.itemsActions.updateTempItem({
          modelID: element.modelID,
          model: element.name
        });
        break;
      case ItemProperties.category:
        this.itemsActions.updateTempItem({
          categoryID: element.categoryID,
          category: element.name
        });
        break;
    }
  }
}
