import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { Actions, ItemProperties } from '../../constants';

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
    public popoverCtrl: PopoverController
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

  presentPopover(event, elements, type) {
    let popover = this.popoverCtrl.create(ItemPopoverPage, {
      elements: elements,
      type: type
    });

    popover.onDidDismiss(value => {
      if (value) {
        switch (type) {
          case this.itemProperties.brand:
            this.item.brandID = value.id;
            this.selectedBrand = value.name;
            break;
          case this.itemProperties.model:
            this.item.modelID = value.id;
            this.selectedModel = value.name;
            break;
          case this.itemProperties.category:
            this.item.categoryID = value.id;
            this.selectedCategory = value.name;
            break;
          case this.itemProperties.status:
            this.item.statusID = value.id;
            this.selectedStatus = value.name;
            break;
        }
      }
    });

    popover.present({
      ev: event
    });
  }
}

@Component({
  template: `
  <ion-searchbar (ionInput)="getElements($event)" placeholder="Filter {{ type }}"></ion-searchbar>
  <ion-list>
    <button ion-item detail-none *ngFor="let element of filteredElements" (click)="elementSelected(element)">
      {{ element.name }}
    </button>
  </ion-list>
  `
})
export class ItemPopoverPage {
  allElements;
  filteredElements;
  type: ItemProperties;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.allElements = this.navParams.data.elements;
      this.type = this.navParams.data.type;
    }
  }

  getElements(ev: any) {
    // Reset items back to all of the items
    this.filteredElements = this.allElements;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.filteredElements = this.filteredElements.filter((element) => {
        return (element.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  elementSelected(element: Object) {
    this.viewCtrl.dismiss(element);
  }
}
