import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';

import { Actions, ItemProperties, Messages } from '../../constants';
import { ItemFilterPage } from '../item-filter/item-filter';
import { IonicPlugins } from '../../providers/ionic-plugins';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  actions = Actions;
  itemProperties = ItemProperties;
  action: Actions = '';
  item: {modelID?: number, categoryID?: number, tag?: string} = {};
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
    public ionicPlugins: IonicPlugins,
    public events: Events
  ) { }

  ngOnInit() {
    this.item.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    this.inventoryData.getBrands().subscribe(
      (brands: any) => this.allBrands = brands.results,
      err => this.ionicPlugins.showToast(err)
    );

    this.inventoryData.getCategories().subscribe(
      (categories: any) => this.allCategories = categories.results,
      err => this.ionicPlugins.showToast(err)
    );

    if (this.action === this.actions.edit) {
      this.inventoryData.getItem(this.item.tag).subscribe(
        (item: any) => {
          this.item.modelID = item.modelID;
          this.item.categoryID = item.categoryID;
          this.item.tag = item.tag;
          this.selectedBrandID = item.brandID;
          this.selectedBrand = item.brand;
          this.selectedModel = item.model;
          this.selectedCategory = item.category;

          this.inventoryData.getModels().subscribe(
            (models: any) => {
              this.allModels = models.results;
              this.filterModels();
            },
            err => this.ionicPlugins.showToast(err)
          );
        },
        err => this.ionicPlugins.showToast(err)
      );
    } else {
      this.inventoryData.getModels().subscribe(
        (models: any) => this.allModels = models.results,
        err => this.ionicPlugins.showToast(err)
      );
    }
  }

  onSave(form: NgForm) {
    if (form.valid) {
      let apiCall;
      let message;

      if (this.action === this.actions.add) {
        apiCall = this.inventoryData.addItem(this.item);
        message = Messages.itemAdded;
      } else if (this.action === this.actions.edit) {
        apiCall = this.inventoryData.editItem(this.item, this.item.tag);
        message = Messages.itemEdited;
      }

      apiCall.subscribe(
        item => {
          this.ionicPlugins.showToast(message);
          this.events.publish('item:edited', item.tag);
          this.navCtrl.pop();
        },
        err => this.ionicPlugins.showToast(err)
      );
    }
  }

  onDelete() {
    this.inventoryData.deleteItem(this.item.tag).subscribe(
      success => {
        this.ionicPlugins.showToast(Messages.itemDeleted);
        this.navCtrl.pop();
      },
      err => this.ionicPlugins.showToast(err)
    );
  }

  filterModels() {
    this.filteredModels = this.allModels.filter((model) => {
      return (model.brandID === this.selectedBrandID);
    });
  }

  presentModal(elements, type) {
    let modal = this.modalCtrl.create(ItemFilterPage, {
      elements: elements,
      type: type
    });

    modal.onDidDismiss((element, isNew) => {
      if (element) {
        if (isNew) {
          switch (type) {
            case this.itemProperties.brand:
              this.inventoryData.addBrand(element).subscribe(
                (brand: any) => {
                  const newBrand = {
                    brandID: brand.id,
                    name: element
                  };

                  this.selectedBrandID = newBrand.brandID;
                  this.selectedBrand = newBrand.name;
                  this.allBrands.push(newBrand);
                  this.selectedModel = '';
                  this.filterModels();
                },
                err => this.ionicPlugins.showToast(err)
              );
              break;
            case this.itemProperties.model:
              this.inventoryData.addModel(element, this.selectedBrandID).subscribe(
                (model: any) => {
                  const newModel = {
                    modelID: model.id,
                    name: element
                  };

                  this.item.modelID = newModel.modelID;
                  this.selectedModel = newModel.name;
                  this.allModels.push(newModel);
                },
                err => this.ionicPlugins.showToast(err)
              );
              break;
            case this.itemProperties.category:
              this.inventoryData.addCategory(element).subscribe(
                (category: any) => {
                  const newCategory = {
                    categoryID: category.id,
                    name: element
                  };

                  this.item.categoryID = newCategory.categoryID;
                  this.selectedCategory = newCategory.name;
                  this.allCategories.push(newCategory);
                },
                err => this.ionicPlugins.showToast(err)
              );
              break;
          }
        } else {
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
   });

    modal.present();
  }
}
