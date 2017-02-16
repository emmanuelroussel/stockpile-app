import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { StockpileData } from './stockpile-data';
import { Links } from '../constants';
import 'rxjs/add/operator/map';

@Injectable()
export class UserData {
  storage = new Storage();

  constructor(
    public authHttp: AuthHttp,
    public stockpileData: StockpileData,
    public http: Http
  ) { }

  login(email: string, password: string) {
    let creds = {
      'email': email,
      'password': password
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.stockpileData.getUrl(Links.authenticate), creds)
        .map(this.extractData)
        .subscribe(
          data => {
            this.storage.set('id_token', data.token);
            resolve(data);
          },
          err => reject(err)
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

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
