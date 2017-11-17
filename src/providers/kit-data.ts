import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class KitData {

  constructor(public api: Api) {}

  getKits(limit?: number, offset?: number) {
    let params: HttpParams = new HttpParams();

    if (limit) {
      params = params.append('limit', limit.toString());
    }

    if (offset) {
      params = params.append('offset', offset.toString());
    }

    return this.api.get(Links.kit, { params });
  }

  getKit(kitID: number) {
    return this.api.get(`${Links.kit}/${kitID}`);
  }

  getKitModels(kitID: number) {
    return this.api.get(`${Links.kit}/${kitID}${Links.model}`);
  }

  addKitModel(kitID: number, kitModel: any) {
    return this.api.put(`${Links.kit}/${kitID}${Links.model}`, kitModel);
  }

  updateKitModel(kitID: number, kitModel: any) {
    return this.api.put(`${Links.kit}/${kitID}${Links.model}/${kitModel.modelID}`, kitModel);
  }

  deleteKitModel(kitID: number, modelID: number) {
    return this.api.delete(`${Links.kit}/${kitID}${Links.model}/${modelID}`);
  }

  createKit(kit: any) {
    return this.api.put(Links.kit, kit);
  }

  updateKit(kit: any) {
    return this.api.put(`${Links.kit}/${kit.kitID}`, kit);
  }

  deleteKit(kitID: number) {
    return this.api.delete(`${Links.kit}/${kitID}`);
  }
}
