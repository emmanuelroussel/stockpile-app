import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { Actions, ItemProperties } from '../../constants';
import { ItemFilterPage } from '../item-filter/item-filter';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  actions = Actions;
  itemProperties = ItemProperties;
  action: Actions = '';
  item: {brandID?: number, modelID?: number, categoryID?: number, statusID?: number, tag?: string} = {};
  selectedBrand: string;
  allBrands;
  selectedModel: string;
  allModels;
  selectedStatus: string;
  allStatuses;
  selectedCategory: string;
  allCategories;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.item.tag = this.navParams.get('tag');
    this.action = this.navParams.get('action');

    this.inventoryData.getBrands().subscribe(
      brands => this.allBrands = brands,
      err => console.log(err)
    );

    this.inventoryData.getModels().subscribe(
      models => this.allModels = models,
      err => console.log(err)
    );

    this.inventoryData.getStatuses().subscribe(
      statuses => this.allStatuses = statuses,
      err => console.log(err)
    );

    this.inventoryData.getCategories().subscribe(
      categories => this.allCategories = categories,
      err => console.log(err)
    );

    if (this.action === this.actions.edit) {
      this.inventoryData.getItem(this.item.tag).subscribe(
        item => {
          this.item.brandID = item.brandID;
          this.item.modelID = item.modelID;
          this.item.categoryID = item.categoryID;
          this.item.statusID = item.statusID;
          this.item.tag = item.tag;
          this.selectedBrand = item.brand;
          this.selectedModel = item.model;
          this.selectedCategory = item.category;
          this.selectedStatus = item.status;
        },
        err => console.error(err)
      );
    }
  }

  onSave(form: NgForm) {
    if (form.valid) {
      if (this.action === this.actions.add) {
        this.inventoryData.addItem(this.item).subscribe(
          success => this.navCtrl.pop(),
          err => console.error(err)
        );
      } else if (this.action === this.actions.edit) {
        this.inventoryData.editItem(this.item).subscribe(
          success => this.navCtrl.pop(),
          err => console.error(err)
        );
      }
    }
  }

  onDelete() {
    this.inventoryData.deleteItem(this.item.tag).subscribe(
      success => this.navCtrl.pop(),
      err => console.error(err)
    );
  }

  presentModal(event, elements, type) {
    let modal = this.modalCtrl.create(ItemFilterPage, {
      elements: elements,
      type: type
    });

    modal.onDidDismiss((element, isNew) => {
      if (element) {
        if (isNew) {
          switch (type) {
            case this.itemProperties.brand:
              this.inventoryData.addBrand(element.name).subscribe(
                brand => {
                  this.item.brandID = brand.id;
                  this.selectedBrand = brand.name;
                },
                err => console.error(err)
              );
              break;
            case this.itemProperties.model:
              this.inventoryData.addModel(element.name).subscribe(
                model => {
                  this.item.modelID = model.id;
                  this.selectedModel = model.name;
                },
                err => console.error(err)
              );
              break;
            case this.itemProperties.category:
              this.inventoryData.addCategory(element.name).subscribe(
                category => {
                  this.item.categoryID = category.id;
                  this.selectedCategory = category.name;
                },
                err => console.error(err)
              );
              break;
            case this.itemProperties.status:
              this.inventoryData.addStatus(element.name).subscribe(
                status => {
                  this.item.statusID = status.id;
                  this.selectedStatus = status.name;
                },
                err => console.error(err)
              );
              break;
          }
        } else {
          switch (type) {
            case this.itemProperties.brand:
              this.item.brandID = element.id;
              this.selectedBrand = element.name;
              break;
            case this.itemProperties.model:
              this.item.modelID = element.id;
              this.selectedModel = element.name;
              break;
            case this.itemProperties.category:
              this.item.categoryID = element.id;
              this.selectedCategory = element.name;
              break;
            case this.itemProperties.status:
              this.item.statusID = element.id;
              this.selectedStatus = element.name;
              break;
          }
        }
      }
   });

    modal.present();
  }
}
