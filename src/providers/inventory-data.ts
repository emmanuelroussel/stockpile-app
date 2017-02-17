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
    return this.authHttp.get(ApiUrl + '/item/' + tag)
      .map(this.extractData);
  }

  addItem(item: Object, tag: string) {
    return this.authHttp.put(this.stockpileData.getUrl(Links.createitem), item)
      .map(this.extractData);
  }

  editItem(item: Object, tag: string) {
    return Observable.fromPromise(Promise.resolve());
  }

  deleteItem(tag: string) {
    return Observable.fromPromise(Promise.resolve());
  }

  rent(items: Array<Object>, details: Object) {
    return Observable.fromPromise(Promise.resolve());
  }

  return(items: Array<Object>) {
    return Observable.fromPromise(Promise.resolve());
  }

  getConditions() {
    return Observable.fromPromise(Promise.resolve(TestData.conditions));
  }

  getCategories() {
    return Observable.fromPromise(Promise.resolve(TestData.categories));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
