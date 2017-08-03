import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class KitModelsActions {

  static FETCH = type('[Kit Models] Fetch');
  static FETCH_SUCCESS = type('[Kit Models] Fetch Success');
  static FETCH_FAIL = type('[Kit Models] Fetch Fail');

  static UPDATE = type('[Kit Models] Update');
  static UPDATE_SUCCESS = type('[Kit Models] Update Success');
  static UPDATE_FAIL = type('[Kit Models] Update Fail');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchKitModels(kitID: number) {
    this.store.dispatch(createAction(KitModelsActions.FETCH, kitID));
  }

}
