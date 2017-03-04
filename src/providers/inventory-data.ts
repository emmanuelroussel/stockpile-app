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
    return Observable.fromPromise(Promise.resolve(TestData.brands[0]));
  }

  getModels() {
    return this.getEndpoint(Links.model);
  }

  addModel(model: string, brandID: number) {
    return Observable.fromPromise(Promise.resolve(TestData.models[0]));
  }

  getCategories() {
    return this.getEndpoint(Links.category);
  }

  addCategory(category: string) {
    return Observable.fromPromise(Promise.resolve(TestData.categories[0]));
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
