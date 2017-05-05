import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class ItemData {

  constructor(public api: Api) {}

  getItem(barcode: string) {
    return this.api.get(`${Links.item}/${barcode}`);
  }

  addItem(item: Object) {
    return this.api.put(Links.item, item);
  }

  editItem(item: Object, barcode: string) {
    return this.api.put(`${Links.item}/${barcode}`, item);
  }

  deleteItem(barcode: string) {
    return this.api.delete(`${Links.item}/${barcode}`);
  }

  filterItems(brandID?: number, modelID?: number, categoryID?: number, available?: number, limit?: number, offset?: number) {
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

    if (limit) {
      params.set('limit', limit.toString());
    }

    if (offset) {
      params.set('offset', offset.toString());
    }

    return this.api.get(Links.item, {
      search: params
    });
  }

  rent(rental: Object) {
    return this.api.put(Links.rental, rental);
  }

  return(rentalID: number, returnDate: string) {
    const body = {
      returnDate
    };

    return this.api.put(`${Links.rental}/${rentalID}`, body);
  }

  getActiveRental(barcode: string) {
    return this.api.get(`${Links.item}/${barcode}${Links.rental}${Links.active}`);
  }
}
