import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class ItemData {

  constructor(public api: Api) {}

  getItem(barcode: string) {
    return this.api.get(`${Links.item}/${barcode}`);
  }

  createItem(item: any) {
    return this.api.put(Links.item, item);
  }

  updateItem(item: any, barcode: string) {
    return this.api.put(`${Links.item}/${barcode}`, item);
  }

  deleteItem(barcode: string) {
    return this.api.delete(`${Links.item}/${barcode}`);
  }

  filterItems(
    brandID?: number,
    modelID?: number,
    categoryID?: number,
    available?: number,
    search?: string
  ) {
    let params: HttpParams = new HttpParams();

    if (Math.sign(brandID) > 0) {
      params = params.append('brandID', brandID.toString());
    }

    if (Math.sign(modelID) > 0) {
      params = params.append('modelID', modelID.toString());
    }

    if (Math.sign(categoryID) > 0) {
      params = params.append('categoryID', categoryID.toString());
    }

    if (Math.sign(available) > -1) {
      params = params.append('available', available.toString());
    }

    if (search) {
      params = params.append('search', search);
    }

    return this.api.get(Links.item, { params });
  }

  rent(rental: any) {
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

  getItemCustomFields(barcode: string) {
    return this.api.get(`${Links.item}/${barcode}${Links.customField}`);
  }

  getItemCustomFieldsByCategory(categoryID: number) {
    return this.api.get(`${Links.category}/${categoryID}${Links.customField}`);
  }

  updateItemCustomField(barcode: string, customFieldID: number, itemCustomField: any) {
    return this.api.put(`${Links.item}/${barcode}${Links.customField}/${customFieldID}`, itemCustomField);
  }
}
