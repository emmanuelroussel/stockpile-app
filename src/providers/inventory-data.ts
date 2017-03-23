import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Links } from '../constants';
import { ApiUrl } from './api-url';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class InventoryData {

  constructor(
    public apiUrl: ApiUrl,
    public authHttp: AuthHttp
  ) { }

  getItem(tag: string) {
    return this.getEndpoint(`${Links.item}/${tag}`);
  }

  getAllItems() {
    return this.getEndpoint(Links.item);
  }

  addItem(item: Object) {
    return this.putEndpoint(Links.item, item);
  }

  editItem(item: Object, tag: string) {
    return this.putEndpoint(`${Links.item}/${tag}`, item);
  }

  deleteItem(tag: string) {
    return this.deleteEndpoint(`${Links.item}/${tag}`);
  }

  filterItems(brandID?: number, modelID?: number, categoryID?: number, available?: number) {
    let params: URLSearchParams = new URLSearchParams();

    if (Math.sign(brandID) > 0) {
      params.set('brandID', brandID.toString());
    }

    if (Math.sign(modelID) > 0) {
      params.set('modelID', modelID.toString());
    }

    if (Math.sign(categoryID) > 0) {
      params.set('categoryID', categoryID.toString());
    }

    if (Math.sign(available) > -1) {
      params.set('available', available.toString());
    }

    return this.getEndpoint(Links.item, {
      search: params
    });
  }

  rent(rental: Object) {
    return this.putEndpoint(Links.rental, rental);
  }

  return(tag: string) {
      return this.deleteEndpoint(`${Links.rental}/${tag}`);
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

  private getEndpoint(endpoint: string, params?: Object) {
    return this.authHttp.get(`${this.apiUrl.getUrl()}${endpoint}`, params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private putEndpoint(endpoint: string, body: Object) {
    return this.authHttp.put(`${this.apiUrl.getUrl()}${endpoint}`, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private deleteEndpoint(endpoint: string) {
    return this.authHttp.delete(`${this.apiUrl.getUrl()}${endpoint}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any, caught: any) {
    let message: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      message = body.message || JSON.stringify(body);
    } else {
      message = error.message ? error.message : error.toString();
    }

    return Observable.throw(message);
  }
}
