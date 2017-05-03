import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';

import { Actions, ItemProperties, Messages } from '../../constants';
import { ItemFilterPage } from '../item-filter/item-filter';
import { Notifications } from '../../providers/notifications';

@Component({
  selector: 'page-add-kit-item',
  templateUrl: 'add-kit-item.html'
})
export class AddKitItemPage {
  itemProperties = ItemProperties;
  kitItem: {brandID?: number, brand?: string, modelID?: number, model?: string} = {};
  allBrands;
  allModels;
  filteredModels;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData,
    public modalCtrl: ModalController,
    public notifications: Notifications,
    public events: Events
  ) { }

  /**
   * Gets brands and models from the api.
   */
  ngOnInit() {
    this.inventoryData.getBrands().subscribe(
      (brands: any) => this.allBrands = brands.results,
      err => this.notifications.showToast(err)
    );

    this.inventoryData.getModels().subscribe(
      (models: any) => {
        this.allModels = models.results;
      },
      err => this.notifications.showToast(err)
    );
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
   * Sets filteredModels to all models that have the corresponding brandID
   */
  filterModels() {
    this.filteredModels = this.allModels.filter((model) => {
      return (model.brandID === this.kitItem.brandID);
    });
  }

  /**
   * Presents the ItemFilterPage as a modal to allow the user to choose a brand
   * or model. When dismissed, creates the brand or model if the user chose to
   * create a new one or saves it otherwise.
   */
  onPresentModal(elements, type) {
    let modal = this.modalCtrl.create(ItemFilterPage, { elements, type });

    modal.onDidDismiss((element, isNew) => {
      if (element) {
        if (isNew) {
          this.createElement(type, element);
        } else {
          this.assignElement(type, element);
        }
      }
   });

    modal.present();
  }

  /**
   * Calls the api to create a new brand or model, pushes it to the local
   * brands or models calls assignElement() to assign it to the kitItem.
   */
  createElement(type, element) {
    switch (type) {
      case ItemProperties.brand:
        this.inventoryData.addBrand(element).subscribe(
          (brand: any) => {
            const newBrand = {
              brandID: brand.id,
              name: element
            };

            this.allBrands.push(newBrand);
            this.assignElement(type, newBrand);
          },
          err => this.notifications.showToast(err)
        );
        break;
      case ItemProperties.model:
        this.inventoryData.addModel(element, this.kitItem.brandID).subscribe(
          (model: any) => {
            const newModel = {
              modelID: model.id,
              name: element
            };

            this.allModels.push(newModel);
            this.assignElement(type, newModel);
          },
          err => this.notifications.showToast(err)
        );
        break;
    }
  }

  /**
   * Sets the brand or model to the kitItem class variable.
   */
  assignElement(type, element) {
    switch (type) {
      case ItemProperties.brand:
        this.kitItem.brand = element.name;
        this.kitItem.brandID = element.brandID;
        this.filterModels();
        break;
      case ItemProperties.model:
        this.kitItem.model = element.name;
        this.kitItem.modelID = element.modelID;
        break;
    }
  }
}
