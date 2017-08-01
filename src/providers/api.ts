import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { ApiUrl } from './api-url';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class Api {

  constructor(
    public authHttp: AuthHttp,
    public apiUrl: ApiUrl
  ) {}

  /**
   * Does a GET request to the Stockpile API with authentication header.
   */
  get(endpoint: string, params?: Object) {
    return this.authHttp.get(`${this.apiUrl.getUrl()}${endpoint}`, params)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  /**
   * Does a PUT request to the Stockpile API with authentication header.
   */
  put(endpoint: string, body: Object) {
    return this.authHttp.put(`${this.apiUrl.getUrl()}${endpoint}`, body)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  /**
   * Does a DELETE request to the Stockpile API with authentication header.
   */
  delete(endpoint: string) {
    return this.authHttp.delete(`${this.apiUrl.getUrl()}${endpoint}`)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }
}
