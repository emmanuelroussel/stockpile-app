import { CloudSettings } from '@ionic/cloud-angular';
import { Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ErrorReport } from './raven-error-handler';
import { apiVersion } from '../constants';
import 'rxjs/Rx';

let errorReport = new ErrorReport();

/**
 * Angular2-jwt's config to work with Ionic's Storage.
 */
export function getAuthHttp(http, storage) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [
      { 'Accept-Version': apiVersion }
    ],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1437b8f0'
  }
};

/**
 * Logs error and gets message from api error and throw it.
 */
export function handleError(error: Response | any, caught: any) {
  // Don't report 404s and 401s because they are a normal behavior of the api most of
  // the time. Ex: user scans item not present in the database or wrong password
  if (error.status !== 404 || error.status !== 401) {
    errorReport.reportError(error.json());
  }

  return Observable.throw(error.json());
}

/**
 * Transforms data from the api into json.
 */
export function extractData(res: Response) {
  return res.json() || {};
}
