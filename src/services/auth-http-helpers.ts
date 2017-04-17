import { CloudSettings } from '@ionic/cloud-angular';
import { Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ErrorReport } from './raven-error-handler';
import 'rxjs/Rx';

let errorReport = new ErrorReport();

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

  // Don't report 404s because they are a normal behavior of the api most of the time
  // ex: user scan item not present in the database
  if (error.status !== 404) {
    errorReport.reportError(error);
  }

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
