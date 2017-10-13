import { Component } from '@angular/core';
import { NavParams, ModalController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Actions, ItemProperties, LoadingMessages } from '../../constants';
import { ItemFilterPage } from '../item-filter/item-filter';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { LayoutActions } from '../../store/layout/layout.actions';

@Component({
  selector: 'page-field',
  templateUrl: 'field.html'
})
export class FieldPage {
  actions = Actions;
  itemProperties = ItemProperties;
  action: Actions = '';
  type: string = '';
  field;
  fieldForm: FormGroup;
  blur = { name: false };
  errors = { brand: false };

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public brandsActions: BrandsActions,
    public modelsActions: ModelsActions,
    public categoriesActions: CategoriesActions,
    public layoutActions: LayoutActions,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Gets action (add or edit) and type (brand, model or category. If action is
   * edit, also get the field.
   */
  ngOnInit() {
    // Initializing field to avoid undefined errors later
    this.field = {};

    this.action = this.navParams.get('action');
    this.type = this.navParams.get('type');

    if (this.action === Actions.edit) {
      this.field = this.navParams.get('field');
    }

    this.fieldForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  /**
   * Updates or creates field depending on the action.
   */
  onSave() {
    this.blur.name = true;

    if (this.type === ItemProperties.model) {
      this.errors.brand = this.field.brand ? false : true;
    }

    if (this.fieldForm.valid && !this.errors.brand) {
      if (this.action === Actions.add) {
        switch (this.type) {
          case ItemProperties.brand:
            this.layoutActions.showLoadingMessage(LoadingMessages.creatingBrand);
            this.brandsActions.createBrand(this.fieldForm.value.name, true);
            break;
          case ItemProperties.model:
            this.layoutActions.showLoadingMessage(LoadingMessages.creatingModel);
            this.modelsActions.createModel(this.fieldForm.value.name, this.field.brandID, true);
            break;
          case ItemProperties.category:
            this.layoutActions.showLoadingMessage(LoadingMessages.creatingCategory);
            this.categoriesActions.createCategory(this.fieldForm.value.name, true);
            break;
        }
      } else if (this.action === Actions.edit) {
        switch (this.type) {
          case ItemProperties.brand:
            this.layoutActions.showLoadingMessage(LoadingMessages.updatingBrand);
            this.brandsActions.updateBrand({
              name: this.fieldForm.value.name,
              brandID: this.field.brandID
            });
            break;
          case ItemProperties.model:
            this.layoutActions.showLoadingMessage(LoadingMessages.updatingModel);
            this.modelsActions.updateModel({
              modelID: this.field.modelID,
              name: this.fieldForm.value.name,
              brandID: this.field.brandID
            });
            break;
          case ItemProperties.category:
            this.layoutActions.showLoadingMessage(LoadingMessages.updatingCategory);
            this.categoriesActions.updateCategory({
              name: this.fieldForm.value.name,
              categoryID: this.field.categoryID
            });
            break;
        }
      }
    }
  }

  /**
   * Confirms if user wants to delete the field.
   */
  onDelete() {
    let alert = this.alertCtrl.create({
      title: `Are you sure you want to delete this ${this.type.toLowerCase()}?`,
      message: `Make sure no items currently have this ${this.type.toLowerCase()}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.deleteField()
        }
      ]
    });
    alert.present();
  }

  /**
   * Deletes the field.
   */
  deleteField() {
    switch (this.type) {
      case ItemProperties.brand:
        this.layoutActions.showLoadingMessage(LoadingMessages.deletingBrand);
        this.brandsActions.deleteBrand(this.field.brandID);
        break;
      case ItemProperties.model:
        this.layoutActions.showLoadingMessage(LoadingMessages.deletingModel);
        this.modelsActions.deleteModel(this.field.modelID);
        break;
      case ItemProperties.category:
        this.layoutActions.showLoadingMessage(LoadingMessages.deletingCategory);
        this.categoriesActions.deleteCategory(this.field.categoryID);
        break;
    }
  }

  /**
   * Presents a modal to allow the user to choose a brand. When dismissed,
   * updates the model with the new brand.
   */
  onSelectBrand() {
    this.brandsActions.fetchBrands();
    let modal = this.modalCtrl.create(ItemFilterPage, { type: ItemProperties.brand });

    modal.onDidDismiss(brand => {
      // If user cancelled, brand will be undefined
      if (brand) {
        this.updateModel(brand);
      }
   });

    modal.present();
  }

  /**
   * Updates the model with the new brand.
   */
  updateModel(brand) {
    this.field = {
      ...this.field,
      brand: brand.name,
      brandID: brand.brandID
    };
    this.errors.brand = false;
  }

  get name() { return this.fieldForm.get('name'); }
}
