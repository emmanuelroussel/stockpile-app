import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { ItemProperties } from '../../constants';
import { BrandsService } from '../../services/brands.service';
import { ModelsService } from '../../services/models.service';
import { CategoriesService } from '../../services/categories.service';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-item-filter',
  templateUrl: 'item-filter.html'
})
export class ItemFilterPage {
  elements: Observable<any>;
  brandID: number;
  type;
  showAddNew: Observable<boolean>;
  queryText: string = '';

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public brandsActions: BrandsActions,
    public brandsService: BrandsService,
    public modelsActions: ModelsActions,
    public modelsService: ModelsService,
    public categoriesActions: CategoriesActions,
    public categoriesService: CategoriesService,
  ) {}

  /**
   * This page is used to let the user choose a brand, model or category.
   * ngOnInit gets the type and the elements (brands, models or categories).
   */
  ngOnInit() {
    this.type = this.navParams.get('type');
    // We only need the brandID to filter models
    this.brandID = this.navParams.get('brandID');

    switch (this.type) {
      case ItemProperties.brand:
        this.elements = this.brandsService.getBrands();
        this.showAddNew = this.brandsService.getShouldShowAddNew();
        break;
      case ItemProperties.model:
        this.elements = this.modelsService.getModels();
        this.showAddNew = this.modelsService.getShouldShowAddNew();
        // Filter models to only show the ones with the corresponding brandID
        this.modelsActions.filterModels(this.brandID);
        break;
      case ItemProperties.category:
        this.elements = this.categoriesService.getCategories();
        this.showAddNew = this.categoriesService.getShouldShowAddNew();
        break;
    }
  }

  /**
   * Filters the brands, models or categories that match the text in the search
   * bar.
   */
  onSearch(event: any) {
    // When the search bar is cleared with the 'x', its value is undefined. This
    // prevents triming an undefined value and defaults to an empty string.
    let text = '';
    if (event.target.value) {
       text = event.target.value.trim();
    }

    switch (this.type) {
      case ItemProperties.brand:
        this.brandsActions.filterBrands(text);
        break;
      case ItemProperties.model:
        this.modelsActions.filterModels(this.brandID, text);
        break;
      case ItemProperties.category:
        this.categoriesActions.filterCategories(text);
        break;
    }
  }

  /**
   * Closes the modal and passes the selected brand, model or category.
   */
  onDismiss(element?: any) {
    this.viewCtrl.dismiss(element);
  }

  /**
   * Creates alert to allow user to create a new brand, model or category.
   */
  onCreateNew() {
    let alert = this.alertCtrl.create({
      title: `Create new ${this.type.toLowerCase()}`,
      inputs: [
        {
          name: 'name',
          placeholder: `${this.type} name`,
          value: this.queryText
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: form => {
            switch (this.type) {
              case ItemProperties.brand:
                this.brandsActions.createBrand(form.name);
                break;
              case ItemProperties.model:
                this.modelsActions.createModel(form.name, this.brandID);
                break;
              case ItemProperties.category:
                this.categoriesActions.createCategory(form.name);
                break;
            }

            // Workaround to detect when the brand, model or category has been
            // created and added to the store. Dismisses the modal and passes
            // the newly created field. This allows to handle field creation in
            // this modal instead of in the component that creates it and
            // allows for much cleaner components.
            // It works because this modal will be destroyed when dismiss is
            // called, so the subscribe could not be called again when the
            // elements change.
            this.elements.subscribe(elements => {
              const newElement = Object.keys(elements.results).map((key) => elements.results[key])
                .find(element => element.name === form.name);

              if (newElement) {
                this.onDismiss(newElement);
              }
            });
          }
        }
      ]
    });

    alert.present();
  }
}
