import { Injectable } from '@angular/core';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class ItemPropertyData {

  constructor(public api: Api) {}

  getBrands() {
    return this.api.get(Links.brand);
  }

  addBrand(brand: string) {
    const body = {
      name: brand
    };

    return this.api.put(Links.brand, body);
  }

  getModels() {
    return this.api.get(Links.model);
  }

  addModel(model: string, brandID: number) {
    const body = {
      name: model,
      brandID: brandID
    };

    return this.api.put(Links.model, body);
  }

  getCategories() {
    return this.api.get(Links.category);
  }

  addCategory(category: string) {
    const body = {
      name: category
    };

    return this.api.put(Links.category, body);
  }
}
