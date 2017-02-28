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
    return this.authHttp.put(ApiUrl + Links.item, item)
      .map(this.extractData);
  }

  editItem(item: Object, tag: string) {
    return this.authHttp.put(ApiUrl + Links.item + '/' + tag, item)
      .map(this.extractData);
  }

  deleteItem(tag: string) {
    return this.authHttp.delete(ApiUrl + Links.item + '/' + tag)
      .map(this.extractData);
  }

  rent(rental: Object) {
    return this.authHttp.put(ApiUrl + Links.rental, rental)
      .map(this.extractData);
  }

  return(tag: string) {
    return this.authHttp.delete(ApiUrl + Links.rental + '/' + tag)
      .map(this.extractData);
  }

  getBrands() {
    return this.getEndpoint(Links.brand);
  }

  addBrand(brand: string) {
    return Observable.fromPromise(Promise.resolve(TestData.brands[0]));
  }

  getModels() {
    return this.getEndpoint(Links.model);
  }

  addModel(brand: string) {
    return Observable.fromPromise(Promise.resolve(TestData.models[0]));
  }

  getCategories() {
    return this.getEndpoint(Links.category);
  }

  private getEndpoint(endpoint: string) {
    return this.authHttp.get(ApiUrl + endpoint)
      .map(this.extractData);
  }

  addCategory(brand: string) {
    return Observable.fromPromise(Promise.resolve(TestData.categories[0]));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
