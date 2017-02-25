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
    return this.getEndpoint(Links.item + '/' + tag);
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

  getModels() {
    return this.getEndpoint(Links.model);
  }

  getStatuses() {
    return this.getEndpoint(Links.status);
  }

  getCategories() {
    return this.getEndpoint(Links.category);
  }

  private getEndpoint(endpoint: string) {
    return this.authHttp.get(ApiUrl + endpoint)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
