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
  storage = new Storage();
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public apiUrl: ApiUrl,
    public authHttp: AuthHttp,
    public http: Http
  ) { }

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
            this.storage.set('id_token', data.token);
            Raven.setUserContext({
              id: data.id
            });

            resolve(data);
          },
          err => reject(err)
        );
    });
  }

  logout() {
    this.storage.remove('id_token');
  }

  editUser(user) {
    return new Promise((resolve, reject) => {
      this.storage.get('id_token').then(
        token => {
          const id = this.jwtHelper.decodeToken(token).userID;

          this.authHttp.put(`${this.apiUrl.getUrl()}${Links.user}/${id}`, user)
          .map(extractData)
          .catch(handleError)
          .subscribe(
            data => resolve(data),
            err => reject(err)
          );
        }
      );
    });
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.storage.get('id_token').then(token => {
        resolve(tokenNotExpired(null, token));
      });
    });
  }

  setUser() {
    this.storage.get('id_token').then(
      token => {
        Raven.setUserContext({
          id: this.jwtHelper.decodeToken(token).userID
        });
      }
    );
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.storage.get('id_token').then(
        token => {
          const id = this.jwtHelper.decodeToken(token).userID;

          this.getInfo(Links.user, id).then(
            data => resolve(data),
            err => reject(err)
          );
        }
      );
    });
  }

  getOrganization() {
    return new Promise((resolve, reject) => {
      this.storage.get('id_token').then(
        token => {
          const id = this.jwtHelper.decodeToken(token).organizationID;

          this.getInfo(Links.organization, id).then(
            data => resolve(data),
            err => reject(err)
          );
        }
      );
    });
  }

  private getInfo(endpoint, id) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl.getUrl()}${endpoint}/${id}`)
      .map(extractData)
      .catch(handleError)
      .subscribe(
        data => resolve(data),
        err => reject(err)
      );
    });
  }
}
