import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Links } from '../constants';
import { ApiUrl } from './api-url';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserData {
  storage = new Storage();

  constructor(
    public apiUrl: ApiUrl,
    public authHttp: AuthHttp,
    public http: Http,
  ) { }

  login(email: string, password: string) {
    let creds = {
      email: email,
      password: password
    };

    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiUrl.getUrl()}${Links.authenticate}`, creds)
        .map(this.extractData)
        .catch((err, caught) => this.handleError(err, caught))
        .subscribe(
          data => {
            this.storage.set('id_token', data.token);
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

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any, caught: any) {
    let message: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      message = body.message || JSON.stringify(body);
    } else {
      message = error.message ? error.message : error.toString();
    }

    return Observable.throw(message);
  }
}
