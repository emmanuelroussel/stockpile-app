import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';

import { Actions, ItemProperties, Messages } from '../../constants';
import { ItemFilterPage } from '../item-filter/item-filter';
import { Notifications } from '../../providers/notifications';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html'
})
export class EditItemPage {
  actions = Actions;
  itemProperties = ItemProperties;
  action: Actions = '';
  item: {modelID?: number, categoryID?: number, barcode?: string} = {};
  selectedBrandID: number;
  selectedBrand: string;
  allBrands;
  selectedModel: string;
  allModels;
  filteredModels;
  selectedCategory: string;
  allCategories;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData,
    public modalCtrl: ModalController,
    public notifications: Notifications,
    public events: Events
  ) { }

  ngOnInit() {
    this.action = this.navParams.get('action');

    this.inventoryData.getBrands().subscribe(
      (brands: any) => this.allBrands = brands.results,
      err => this.notifications.showToast(err)
    );

    this.inventoryData.getCategories().subscribe(
      (categories: any) => this.allCategories = categories.results,
      err => this.notifications.showToast(err)
    );

    if (this.action === this.actions.add) {
      this.item.barcode = this.navParams.get('barcode');
    } else if (this.action === this.actions.edit) {
      const item = this.navParams.get('item');

      this.item.modelID = item.modelID;
      this.item.categoryID = item.categoryID;
      this.item.barcode = item.barcode;
      this.selectedBrandID = item.brandID;
      this.selectedBrand = item.brand;
      this.selectedModel = item.model;
      this.selectedCategory = item.category;
    }

    this.inventoryData.getModels().subscribe(
      (models: any) => {
        this.allModels = models.results;
        this.filterModels();
      },
      err => this.notifications.showToast(err)
    );
  }

  onSave() {
    let apiCall;
    let message;

    if (this.action === this.actions.add) {
      apiCall = this.inventoryData.addItem(this.item);
      message = Messages.itemAdded;
    } else if (this.action === this.actions.edit) {
      apiCall = this.inventoryData.editItem(this.item, this.item.barcode);
      message = Messages.itemEdited;
    }

    apiCall.subscribe(
      item => {
        this.notifications.showToast(message);
        this.events.publish('item:edited', item.barcode);
        this.navCtrl.pop();
      },
      err => this.notifications.showToast(err)
    );
  }

  onDelete() {
    this.inventoryData.deleteItem(this.item.barcode).subscribe(
      success => {
        this.notifications.showToast(Messages.itemDeleted);
        this.events.publish('item:deleted', this.item.barcode);
        const parentIndex = this.navCtrl.indexOf(this.navCtrl.getPrevious());
        this.navCtrl.remove(parentIndex).then(
          () => this.navCtrl.pop()
        );
      },
      err => this.notifications.showToast(err)
    );
  }

  filterModels() {
    this.filteredModels = this.allModels.filter((model) => {
      return (model.brandID === this.selectedBrandID);
    });
  }

  onPresentModal(elements, type) {
    let modal = this.modalCtrl.create(ItemFilterPage, {
      elements: elements,
      type: type
    });

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

  createElement(type, element) {
    switch (type) {
      case this.itemProperties.brand:
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
      case this.itemProperties.model:
        this.inventoryData.addModel(element, this.selectedBrandID).subscribe(
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
      case this.itemProperties.category:
        this.inventoryData.addCategory(element).subscribe(
          (category: any) => {
            const newCategory = {
              categoryID: category.id,
              name: element
            };

            this.allCategories.push(newCategory);
            this.assignElement(type, newCategory);
          },
          err => this.notifications.showToast(err)
        );
        break;
    }
  }

  assignElement(type, element) {
    switch (type) {
      case this.itemProperties.brand:
        this.selectedBrandID = element.brandID;
        this.selectedBrand = element.name;
        this.selectedModel = '';
        this.filterModels();
        break;
      case this.itemProperties.model:
        this.item.modelID = element.modelID;
        this.selectedModel = element.name;
        break;
      case this.itemProperties.category:
        this.item.categoryID = element.categoryID;
        this.selectedCategory = element.name;
        break;
    }
  }
}
