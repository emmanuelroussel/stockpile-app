import { Injectable } from '@angular/core';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class ItemPropertyData {

  constructor(public api: Api) {}

  getBrands() {
    return this.api.get(Links.brand);
  }

  addBrand(body: Object) {
    return this.api.put(Links.brand, body);
  }

  getModels() {
    return this.api.get(Links.model);
  }

  addModel(body: Object) {
    return this.api.put(Links.model, body);
  }

  getCategories() {
    return this.api.get(Links.category);
  }

  addCategory(body: Object) {
    return this.api.put(Links.category, body);
  }
}
