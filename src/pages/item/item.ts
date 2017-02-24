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

    popover.onDidDismiss((value, addNew) => {
      if (value) {
        if (addNew) {
          switch (type) {
            case this.itemProperties.brand:
              this.inventoryData.addBrand(value.name).subscribe(
                brand => {
                  this.item.brandID = brand.id;
                  this.selectedBrand = brand.name;
                },
                err => console.error(err)
              );
              break;
            case this.itemProperties.model:
              this.inventoryData.addModel(value.name).subscribe(
                model => {
                  this.item.modelID = model.id;
                  this.selectedModel = model.name;
                },
                err => console.error(err)
              );
              break;
            case this.itemProperties.category:
              this.inventoryData.addCategory(value.name).subscribe(
                category => {
                  this.item.categoryID = category.id;
                  this.selectedCategory = category.name;
                },
                err => console.error(err)
              );
              break;
            case this.itemProperties.status:
              this.inventoryData.addStatus(value.name).subscribe(
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
    <button ion-item detail-none *ngIf="showAdd" (click)="elementSelected(input, true)">
       New {{ type.toLowerCase() }}: {{ input }}
    </button>
  </ion-list>
  `
})
export class ItemPopoverPage {
  allElements;
  filteredElements;
  type: ItemProperties;
  showAdd: boolean = false;
  input: string;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.allElements = this.navParams.data.elements;
      this.type = this.navParams.data.type;
    }
  }

  getElements(ev: any) {
    this.filteredElements = this.allElements;
    this.showAdd = false;
    this.input = '';

    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filteredElements = this.filteredElements.filter((element) => {
        return (element.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      if (!this.filteredElements.includes(val.toLowerCase())) {
        this.showAdd = true;
        this.input = val;
      }
    }
  }

  elementSelected(element: Object, addNew: boolean = false) {
    this.viewCtrl.dismiss(element, addNew);
  }
}
