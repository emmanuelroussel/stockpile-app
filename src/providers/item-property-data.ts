import { Injectable } from '@angular/core';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class ItemPropertyData {

  constructor(public api: Api) {}

  getBrands() {
    return this.api.get(Links.brand);
  }

  createBrand(body: Object) {
    return this.api.put(Links.brand, body);
  }

  getModels() {
    return this.api.get(Links.model);
  }

  createModel(body: Object) {
    return this.api.put(Links.model, body);
  }

  getCategories() {
    return this.api.get(Links.category);
  }

  createCategory(body: Object) {
    return this.api.put(Links.category, body);
  }
}
