import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as Raven from 'raven-js';
import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Links } from '../constants';
import { ApiUrl } from './api-url';
import { extractData, handleError } from '../services/auth-http';

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
    const creds = {
      email: email,
      password: password
    };

    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiUrl.getUrl()}${Links.authenticate}`, creds)
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
          id: this.jwtHelper.decodeToken(token).sub
        });
      }
    );
  }
}
