import { Injectable } from '@angular/core';
import { Links } from '../constants';
import { Api } from '../providers/api';

@Injectable()
export class ExternalRenterData {

  constructor(public api: Api) {}

  getExternalRenters() {
    return this.api.get(Links.externalRenter);
  }

  createExternalRenter(body: any) {
    return this.api.put(Links.externalRenter, body);
  }

  updateExternalRenter(body: any, externalRenterID: number) {
    return this.api.put(`${Links.externalRenter}/${externalRenterID}`, body);
  }

  deleteExternalRenter(externalRenterID: number) {
    return this.api.delete(`${Links.externalRenter}/${externalRenterID}`);
  }
}
