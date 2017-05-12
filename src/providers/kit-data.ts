import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class KitData {

  constructor(public api: Api) {}

  getKits(limit?: number, offset?: number) {
    let params: URLSearchParams = new URLSearchParams();

    if (limit) {
      params.set('limit', limit.toString());
    }

    if (offset) {
      params.set('offset', offset.toString());
    }

    return this.api.get(Links.kit, {
      search: params
    });
  }

  getKit(kitID: number) {
    return this.api.get(`${Links.kit}/${kitID}`);
  }

  getKitItems(kitID: number) {
    return this.api.get(`${Links.kit}/${kitID}${Links.model}`);
  }

  addKitItem(kitID: number, modelID: number) {
    const body = {
      modelID
    };

    return this.api.put(`${Links.kit}/${kitID}${Links.model}`, body);
  }

  deleteKitItem(kitID: number, modelID: number) {
    return this.api.delete(`${Links.kit}/${kitID}${Links.model}/${modelID}`);
  }

  addKit(kitName: string) {
    const body = {
      name: kitName
    };

    return this.api.put(Links.kit, body);
  }

  editKit(kit) {
    return this.api.put(`${Links.kit}/${kit.kitID}`, kit);
  }

  deleteKit(kitID: number) {
    return this.api.delete(`${Links.kit}/${kitID}`);
  }
}
