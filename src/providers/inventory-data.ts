import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { StockpileData } from './stockpile-data';
import { Links, ApiUrl } from '../constants';
import { TestData } from '../test-data';
import 'rxjs/Rx';

@Injectable()
export class InventoryData {

  constructor(public authHttp: AuthHttp, public stockpileData: StockpileData) { }

  getItem(tag: string) {
    return this.getEndpoint(Links.item + '/' + tag);
  }

  getAllItems() {
    return this.getEndpoint(Links.item);
  }

  addItem(item: Object) {
    return this.putEndpoint(Links.item, item);
  }

  editItem(item: Object, tag: string) {
    return this.putEndpoint(Links.item + '/' + tag, item);
  }

  deleteItem(tag: string) {
    return this.deleteEndpoint(Links.item + '/' + tag);
  }

  filterItems(categoryIDs: Array<number>, status) {
    return Observable.fromPromise(Promise.resolve(TestData.items));
  }

  rent(rental: Object) {
    return this.putEndpoint(Links.rental, rental);
  }

  return(tag: string) {
    return this.deleteEndpoint(Links.rental + '/' + tag);
  }

  getBrands() {
    return this.getEndpoint(Links.brand);
  }

  addBrand(brand: string) {
    const body = {
      name: brand
    };

    return this.putEndpoint(Links.brand, body);
  }

  getModels() {
    return this.getEndpoint(Links.model);
  }

  addModel(model: string, brandID: number) {
    const body = {
      name: model,
      brandID: brandID
    };

    return this.putEndpoint(Links.model, body);
  }

  getCategories() {
    return this.getEndpoint(Links.category);
  }

  addCategory(category: string) {
    const body = {
      name: category
    };

    return this.putEndpoint(Links.category, body);
  }

  getStatus(tag: string) {
    return this.getEndpoint(Links.item + '/' + tag + '/status');
  }

  private getEndpoint(endpoint: string) {
    return this.authHttp.get(ApiUrl + endpoint)
      .map(this.extractData);
  }

  private putEndpoint(endpoint: string, body: Object) {
    return this.authHttp.put(ApiUrl + endpoint, body)
      .map(this.extractData);
  }

  private deleteEndpoint(endpoint: string) {
    return this.authHttp.delete(ApiUrl + endpoint)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
