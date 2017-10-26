import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { CustomField, CustomFieldCategory, Categories } from '../../models';
import { CustomFieldsService } from '../../services/custom-fields.service';
import { CustomFieldsActions } from '../../store/custom-fields/custom-fields.actions';
import { CustomFieldCategoriesService } from '../../services/custom-field-categories.service';
import { CustomFieldCategoriesActions } from '../../store/custom-field-categories/custom-field-categories.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { CategoriesService } from '../../services/categories.service';
import { FieldPage } from '../../pages/field/field';
import { sort } from '../../utils';

import { Actions, LoadingMessages, ItemProperties } from '../../constants';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-custom-field',
  templateUrl: 'custom-field.html'
})
export class CustomFieldPage {
  customFieldForm: FormGroup;
  blur = { name: false };
  actions = Actions;
  action: Actions = '';
  customField: Observable<CustomField>;
  customFieldCategories: Observable<Array<CustomFieldCategory>>;
  showLoadingSpinner: Observable<boolean>;
  categories: Observable<Categories>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public customFieldsService: CustomFieldsService,
    public customFieldCategoriesService: CustomFieldCategoriesService,
    public customFieldCategoriesActions: CustomFieldCategoriesActions,
    public customFieldsActions: CustomFieldsActions,
    public layoutActions: LayoutActions,
    public formBuilder: FormBuilder,
    public categoriesActions: CategoriesActions,
    public categoriesService: CategoriesService
  ) {}

  /**
   * Gets the action (add or edit) and if action is edit, also gets the custom
   * field and categories.
   */
  ngOnInit() {
    this.action = this.navParams.get('action');
    this.customFieldCategories = this.customFieldCategoriesService.getTempCustomFieldCategories();
    this.customFieldCategoriesActions.resetTempCustomFieldCategories();
    this.showLoadingSpinner = this.customFieldCategoriesService.getShouldShowLoadingSpinner();
    this.categoriesActions.fetchCategories();
    this.categories = this.categoriesService.getCategories();

    this.customFieldForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    if (this.action === Actions.edit) {
      const customFieldID = this.navParams.get('customFieldID');
      this.customFieldCategoriesActions.fetchCustomFieldCategories(customFieldID);
      this.customField = this.customFieldsService.getCustomField(customFieldID);
    }
  }

  /**
   * Creates or updates the custom field, and modifies categories.
   */
  onSave() {
    this.blur.name = true;

    if (this.customFieldForm.valid) {
      if (this.action === Actions.add) {
        this.layoutActions.showLoadingMessage(LoadingMessages.creatingCustomField);
        this.customFieldsActions.createCustomField(this.customFieldForm.value);
      } else {
        let customFieldID;
        this.customField.take(1).subscribe(customField => customFieldID = customField.customFieldID);

        this.layoutActions.showLoadingMessage(LoadingMessages.updatingCustomField);
        this.customFieldsActions.updateCustomField({ name: this.customFieldForm.value.name, customFieldID });
      }
    }
  }

  /**
   * Confirms if user wants to delete the custom field.
   */
  onDelete() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to delete this custom field?',
      message: 'It will also delete all of this custom field values in items',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.deleteCustomField()
        }
      ]
    });
    alert.present();
  }

  /**
   * Deletes custom field.
   */
  deleteCustomField() {
    let customFieldID;
    this.customField.take(1).subscribe(customField => customFieldID = customField.customFieldID);

    this.layoutActions.showLoadingMessage(LoadingMessages.deletingCustomField);
    this.customFieldsActions.deleteCustomField(customFieldID);
  }

  /**
   * Selects all categories.
   */
  onSelectAll() {
    this.customFieldCategoriesActions.resetTempCustomFieldCategories();
  }

  /**
   * Presents an alert to allow users to choose categories.
   */
  onModifyCategories() {
    let currentCategories;
    let options;

    this.categories.take(1).subscribe(categories => {
      currentCategories = Object.keys(categories.results).map((key) => categories.results[key]);
    });

    currentCategories.sort(sort);

    if (currentCategories.length) {
      let selectedCategories;
      let inputs = [];

      this.customFieldCategories.take(1).subscribe(
        customFieldCategories => selectedCategories = customFieldCategories
      );

      currentCategories.map(category => {
        return inputs.push({
          label: category.name,
          value: { categoryID: category.categoryID, categoryName: category.name },
          type: 'checkbox',
          checked: selectedCategories.find(
            selectedCategory => selectedCategory.categoryID === category.categoryID
          )
        });
      });

      options = {
        title: 'Choose Categories',
        inputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: categories => this.customFieldCategoriesActions.updateTemp(categories)
          }
        ]
      };
    } else {
      options = {
        title: 'Categories',
        message: 'You haven\'t created any categories yet.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Create a category',
            handler: () => this.navCtrl.push(FieldPage, {
              action: Actions.add,
              type: ItemProperties.category
            })
          }
        ]
      };
    }

    let alert = this.alertCtrl.create(options);
    alert.present();
  }

  get name() { return this.customFieldForm.get('name'); }
}
