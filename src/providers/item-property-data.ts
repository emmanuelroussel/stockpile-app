import { Injectable } from '@angular/core';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class ItemPropertyData {

  constructor(public api: Api) {}

  getBrands() {
    return this.api.get(Links.brand);
  }

  createBrand(body: any) {
    return this.api.put(Links.brand, body);
  }

  updateBrand(body: any, brandID: number) {
    return this.api.put(`${Links.brand}/${brandID}`, body);
  }

  deleteBrand(brandID: number) {
    return this.api.delete(`${Links.brand}/${brandID}`);
  }

  getModels() {
    return this.api.get(Links.model);
  }

  createModel(body: any) {
    return this.api.put(Links.model, body);
  }

  updateModel(body: any, modelID: number) {
    return this.api.put(`${Links.model}/${modelID}`, body);
  }

  deleteModel(modelID: number) {
    return this.api.delete(`${Links.model}/${modelID}`);
  }

  getCategories() {
    return this.api.get(Links.category);
  }

  createCategory(body: any) {
    return this.api.put(Links.category, body);
  }

  updateCategory(body: any, categoryID: number) {
    return this.api.put(`${Links.category}/${categoryID}`, body);
  }

  deleteCategory(categoryID: number) {
    return this.api.delete(`${Links.category}/${categoryID}`);
  }
}
