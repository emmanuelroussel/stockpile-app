import { CloudSettings } from '@ionic/cloud-angular';
import { Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export function getAuthHttp(http, storage) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1437b8f0'
  }
};

export function handleError(error: Response | any, caught: any) {
  let message: string;

  if (error instanceof Response) {
    const body = error.json() || '';
    message = body.message || JSON.stringify(body);
  } else {
    message = error.message ? error.message : error.toString();
  }

  return Observable.throw(message);
}

export function extractData(res: Response) {
  const body = res.json();
  return body || { };
}
