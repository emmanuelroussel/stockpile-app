import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { BrandsService } from '../../services/brands.service';
import { ModelsService } from '../../services/models.service';
import { CategoriesService } from '../../services/categories.service';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { Brands, Models, Categories } from '../../models';
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
    public categoriesActions: CategoriesActions
  ) {}

  /**
   * Gets brands, models and categories as well as the brand, model and category
   * selected by the user, if any.
   */
  ngOnInit() {
    this.brands = this.brandsService.getBrands();
    this.models = this.modelsService.getModels();
    this.categories = this.categoriesService.getCategories();
    this.selectedBrandID = this.navParams.get('selectedBrandID');
    this.selectedModelID = this.navParams.get('selectedModelID');
    this.selectedCategoryID = this.navParams.get('selectedCategoryID');

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
   * Closes the modal and passes the selected filters.
   */
  onApplyFilters() {
    const ids = {
      selectedBrandID: this.selectedBrandID,
      selectedModelID: this.selectedModelID,
      selectedCategoryID: this.selectedCategoryID
    };

    this.viewCtrl.dismiss(ids);
  }
}
