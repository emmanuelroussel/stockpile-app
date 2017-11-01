import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from './api-url';

@Injectable()
export class Api {

  constructor(
    public http: HttpClient,
    public apiUrl: ApiUrl
  ) {}

  /**
   * Does a GET request to the Stockpile API with authentication header.
   */
  get(endpoint: string, params?: Object) {
    return this.http.get(`${this.apiUrl.getUrl()}${endpoint}`, params);
  }

  /**
   * Does a PUT request to the Stockpile API with authentication header.
   */
  put(endpoint: string, body: Object) {
    return this.http.put(`${this.apiUrl.getUrl()}${endpoint}`, body);
  }

  /**
   * Does a POST request to the Stockpile API with authentication header.
   */
  post(endpoint: string, body: Object) {
    return this.http.post(`${this.apiUrl.getUrl()}${endpoint}`, body);
  }

  /**
   * Does a DELETE request to the Stockpile API with authentication header.
   */
  delete(endpoint: string) {
    return this.http.delete(`${this.apiUrl.getUrl()}${endpoint}`);
  }
}
