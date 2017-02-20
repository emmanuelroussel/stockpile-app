import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { StockpileData } from './stockpile-data';
import { Links, ApiUrl } from '../constants';
import 'rxjs/Rx';

@Injectable()
export class InventoryData {

  constructor(public authHttp: AuthHttp, public stockpileData: StockpileData) { }

  getItem(tag: string) {
    return this.authHttp.get(ApiUrl + Links.item + '/' + tag)
      .map(this.extractData);
  }

  addItem(item: Object) {
    return this.authHttp.put(ApiUrl + Links.item, item)
      .map(this.extractData);
  }

  editItem(item: Object) {
    return Observable.fromPromise(Promise.resolve());
  }

  deleteItem(tag: string) {
    return this.authHttp.delete(ApiUrl + Links.item + '/' + tag)
      .map(this.extractData);
  }

  rent(rental: Object) {
    return this.authHttp.put(ApiUrl + '/rental', rental)
      .map(this.extractData);
  }

  return(items: Array<Object>) {
    return Observable.fromPromise(Promise.resolve());
  }

  getBrands() {
    return Observable.fromPromise(Promise.resolve(TestData.brands));
  }

  getModels() {
    return Observable.fromPromise(Promise.resolve(TestData.models));
  }

  getStatuses() {
    return Observable.fromPromise(Promise.resolve(TestData.statuses));
  }

  getCategories() {
    return Observable.fromPromise(Promise.resolve(TestData.categories));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
