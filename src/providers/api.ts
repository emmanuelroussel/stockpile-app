import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { ApiUrl } from './api-url';
import { extractData, handleError } from '../services/auth-http-helpers';

@Injectable()
export class Api {

  constructor(
    public authHttp: AuthHttp,
    public apiUrl: ApiUrl
  ) { }

  /**
   * Calls api with HTTP GET request with authentication.
   */
  get(endpoint: string, params?: Object) {
    return this.authHttp.get(`${this.apiUrl.getUrl()}${endpoint}`, params)
      .map(extractData)
      .catch(handleError);
  }

  /**
   * Calls api with HTTP PUT request with authentication.
   */
  put(endpoint: string, body: Object) {
    return this.authHttp.put(`${this.apiUrl.getUrl()}${endpoint}`, body)
      .map(extractData)
      .catch(handleError);
  }

  /**
   * Calls api with HTTP DELETE request with authentication.
   */
  delete(endpoint: string) {
    return this.authHttp.delete(`${this.apiUrl.getUrl()}${endpoint}`)
      .map(extractData)
      .catch(handleError);
  }
}
