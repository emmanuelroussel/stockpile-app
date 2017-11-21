import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { BrandsService } from '../../services/brands.service';
import { ModelsService } from '../../services/models.service';
import { CategoriesService } from '../../services/categories.service';
import { ItemsService } from '../../services/items.service';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { ItemsActions } from '../../store/items/items.actions';
import { Brands, Categories, Models } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-inventory-filter',
  templateUrl: 'inventory-filter.html'
})
export class InventoryFilterPage {
  brands: Observable<Brands>;
  models: Observable<Models>;
  categories: Observable<Categories>;
  selectedBrandID = -1;
  selectedModelID = -1;
  selectedCategoryID = -1;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public brandsService: BrandsService,
    public brandsActions: BrandsActions,
    public modelsService: ModelsService,
    public modelsActions: ModelsActions,
    public categoriesService: CategoriesService,
    public categoriesActions: CategoriesActions,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions
  ) {}

  /**
   * Gets brands, models and categories as well as the brand, model and category
   * selected by the user, if any.
   */
  ngOnInit() {
    this.brands = this.brandsService.getBrands();
    this.models = this.modelsService.getModels();
    this.categories = this.categoriesService.getCategories();
    let filters;
    this.itemsService.getItems().take(1).subscribe(items => {
      filters = items.filters;
    });
    this.selectedBrandID = filters.brandID;
    this.selectedModelID = filters.modelID;
    this.selectedCategoryID = filters.categoryID;

    if (this.selectedModelID !== -1) {
      this.onFilterModels();
    }
  }

  /**
   * Filters models that have the selectedBrandID.
   */
  onFilterModels() {
    this.modelsActions.filterModels(this.selectedBrandID);
  }

  /**
   * Removes all selected filters.
   */
  onResetFilters() {
    this.selectedBrandID = -1;
    this.selectedModelID = -1;
    this.selectedCategoryID = -1;
    this.onApplyFilters();
  }

  /**
   * Closes the modal without passing anything.
   */
  onDismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * Closes the modal and saves the selected filters.
   */
  onApplyFilters() {
    this.itemsActions.updateFilters({
      brandID: this.selectedBrandID,
      modelID: this.selectedModelID,
      categoryID: this.selectedCategoryID
    });
    this.viewCtrl.dismiss();
  }
}
