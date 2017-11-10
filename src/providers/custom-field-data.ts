import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class CustomFieldData {

  constructor(public api: Api) {}

  getCustomFields(limit?: number, offset?: number) {
    let params: HttpParams = new HttpParams();

    if (limit) {
      params = params.append('limit', limit.toString());
    }

    if (offset) {
      params = params.append('offset', offset.toString());
    }

    return this.api.get(Links.customField, { params });
  }

  getCustomField(customFieldID: number) {
    return this.api.get(`${Links.customField}/${customFieldID}`);
  }

  createCustomField(customField: any) {
    return this.api.put(Links.customField, customField);
  }

  updateCustomField(customField: any) {
    return this.api.put(`${Links.customField}/${customField.customFieldID}`, customField);
  }

  deleteCustomField(customFieldID: number) {
    return this.api.delete(`${Links.customField}/${customFieldID}`);
  }

  getCategories(customFieldID: number) {
    return this.api.get(`${Links.customField}/${customFieldID}${Links.customFieldCategory}`);
  }

  updateCategories(customFieldID: number, categories: any) {
    return this.api.put(`${Links.customField}/${customFieldID}${Links.customFieldCategory}`, categories);
  }
}
