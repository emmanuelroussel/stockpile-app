import { Storage } from '@ionic/storage';
import { CloudSettings } from '@ionic/cloud-angular';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};
