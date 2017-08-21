import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as Raven from 'raven-js';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Links, apiVersion } from '../constants';
import { ApiUrl } from './api-url';
import { Api } from './api';
import { extractData, handleError } from '../utils/auth-http-helpers';

@Injectable()
export class UserData {
  jwtHelper: JwtHelper = new JwtHelper();
  userID;
  organizationID;

  constructor(
    public apiUrl: ApiUrl,
    public api: Api,
    public http: Http,
    public storage: Storage
  ) {}

  /**
   * Calls api with credentials to log in and saves auth token.
   */
  login(credentials: any) {
    let headers = new Headers();
    headers.append('Accept-Version', apiVersion);

    // Using Http instead of Api because this request does not have authentication
    return this.http.post(`${this.apiUrl.getUrl()}${Links.authenticate}`,
      credentials,
      { headers })
      .map(extractData)
      .catch(handleError);
  }

  /**
   * Clears all stored user data.
   */
  logout() {
    this.storage.remove('id_token');
    this.userID = '';
    this.organizationID = '';
  }

  /**
   * Calls api to edit user.
   */
  updateUser(userID, user?) {
    return this.api.put(`${Links.user}/${userID}`, user);
  }

  /**
   * Calls api with current and new password to change the user's password.
   */
  changePassword(userID: number, passwords: any) {
    return this.api.put(`${Links.user}/${userID}${Links.password}`, passwords);
  }

  /**
   * Checks whether or not the auth token is expired.
   */
  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.storage.get('id_token').then(token => {
        resolve(tokenNotExpired(null, token));
      });
    });
  }

  /**
   * Sets local user from auth token.
   */
  setUser() {
    return new Promise((resolve, reject) => {
      this.storage.get('id_token').then(
        token => {
          this.userID = this.jwtHelper.decodeToken(token).userID;
          this.organizationID = this.jwtHelper.decodeToken(token).organizationID;

          Raven.setUserContext({
            id: this.userID
          });

          resolve();
        }
      );
    });
  }

  /**
   * Calls api to get user info.
   */
  getUser(userID: number) {
    return this.getInfo(Links.user, userID);
  }

  /**
   * Calls api to get organization info.
   */
  getOrganization(organizationID: number) {
    return this.getInfo(Links.organization, organizationID);
  }

  /**
   * Calls api to get info with the specified endpoint and id.
   */
  private getInfo(endpoint, id) {
    return this.api.get(`${endpoint}/${id}`);
  }
}
