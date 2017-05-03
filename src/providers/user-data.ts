import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as Raven from 'raven-js';
import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Links } from '../constants';
import { ApiUrl } from './api-url';
import { extractData, handleError } from '../services/auth-http-helpers';

@Injectable()
export class UserData {
  jwtHelper: JwtHelper = new JwtHelper();
  userID;
  organizationID;

  constructor(
    public apiUrl: ApiUrl,
    public authHttp: AuthHttp,
    public http: Http,
    public storage: Storage
  ) { }

  /**
   * Calls api with credentials to log in and saves auth token.
   */
  login(email: string, password: string) {
    const credentials = {
      email: email,
      password: password
    };

    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiUrl.getUrl()}${Links.authenticate}`, credentials)
        .map(extractData)
        .catch(handleError)
        .subscribe(
          data => {
            this.storage.set('id_token', data.token).then(
              data => resolve(data)
            );
          },
          err => reject(err)
        );
    });
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
  editUser(user) {
    return this.authHttp.put(`${this.apiUrl.getUrl()}${Links.user}/${this.userID}`, user)
    .map(extractData)
    .catch(handleError);
  }

  /**
   * Calls api with current and new password to change the user's password.
   */
  changePassword(currentPassword: string, newPassword: string) {
    const passwords = {
      currentPassword,
      newPassword
    };

    return this.authHttp.put(`${this.apiUrl.getUrl()}${Links.user}/${this.userID}${Links.password}`, passwords)
    .map(extractData)
    .catch(handleError);
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
  getUser() {
    return this.getInfo(Links.user, this.userID);
  }

  /**
   * Calls api to get organization info.
   */
  getOrganization() {
    return this.getInfo(Links.organization, this.organizationID);
  }

  /**
   * Calls api to get info with the specified endpoint and id.
   */
  private getInfo(endpoint, id) {
    return this.authHttp.get(`${this.apiUrl.getUrl()}${endpoint}/${id}`)
    .map(extractData)
    .catch(handleError);
  }
}
