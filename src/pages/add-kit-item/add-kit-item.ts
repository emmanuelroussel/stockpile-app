import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';

import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';

import { ItemProperties } from '../../constants';
import { ItemFilterPage } from '../item-filter/item-filter';

@Component({
  selector: 'page-add-kit-item',
  templateUrl: 'add-kit-item.html'
})
export class AddKitItemPage {
  itemProperties = ItemProperties;
  kitItem: { brandID?: number, brand?: string, modelID?: number, model?: string } = {};

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
    public brandsActions: BrandsActions,
    public modelsActions: ModelsActions,
  ) {}

  /**
   * Fetches brands and models.
   */
  ngOnInit() {
    this.brandsActions.fetchBrands();
    this.modelsActions.fetchModels();
  }

  /**
   * Publishes event to tell the AddKitPage that we added a kit item and pops
   * nav.
   */
  onAdd() {
    this.events.publish('kit-item:added', this.kitItem);
    this.navCtrl.pop();
  }

  /**
   * Presents a modal to allow the user to choose a brand, model or category.
   * When dismissed, updates the kit item with the new data.
   */
  onPresentModal(type) {
    let modal = this.modalCtrl.create(ItemFilterPage, { type, brandID: this.kitItem.brandID });

    modal.onDidDismiss((element) => {
      // If user has chosen an element (did not cancel)
      if (element) {
        const modifiedKitItem = this.getNewKitModelProperties(type, element);
        this.kitItem = { ...this.kitItem, ...modifiedKitItem };
      }
   });

    modal.present();
  }

  /**
   * Returns the brand or model of the kitModel depending on the type.
   */
  getNewKitModelProperties(type, element) {
    switch (type) {
      // Since models are linked to a brand, also reset model when brand changes.
      case ItemProperties.brand:
        return {
          brand: element.name,
          brandID: element.brandID,
          model: '',
          modelID: null
        };
      case ItemProperties.model:
        return {
          model: element.name,
          modelID: element.modelID
        };
    }
  }
}
