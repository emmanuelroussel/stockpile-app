import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-inventory-filter',
  templateUrl: 'inventory-filter.html'
})
export class InventoryFilterPage {
  brands;
  models;
  filteredModels;
  categories;
  selectedBrandID = -1;
  selectedModelID = -1;
  selectedCategoryID = -1;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.brands = this.navParams.get('brands');
    this.models = this.navParams.get('models');
    this.categories = this.navParams.get('categories');
    this.selectedBrandID = this.navParams.get('selectedBrandID');
    this.selectedModelID = this.navParams.get('selectedModelID');
    this.selectedCategoryID = this.navParams.get('selectedCategoryID');

    if (this.selectedModelID !== -1) {
      this.filterModels();
    }
  }

  filterModels() {
    this.filteredModels = this.models.filter((model) => {
      return (model.brandID === this.selectedBrandID);
    });
  }

  resetFilters() {
    this.selectedBrandID = -1;
    this.selectedModelID = -1;
    this.selectedCategoryID = -1;
    this.applyFilters();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  applyFilters() {
    const ids = {
      selectedBrandID: this.selectedBrandID,
      selectedModelID: this.selectedModelID,
      selectedCategoryID: this.selectedCategoryID
    };

    this.viewCtrl.dismiss(ids);
  }
}
