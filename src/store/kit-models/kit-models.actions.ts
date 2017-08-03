import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class KitModelsActions {

  static FETCH = '[Kit Models] Fetch';
  static FETCH_SUCCESS = '[Kit Models] Fetch Success';
  static FETCH_FAIL = '[Kit Models] Fetch Fail';

  static UPDATE = '[Kit Models] Update';
  static UPDATE_SUCCESS = '[Kit Models] Update Success';
  static UPDATE_FAIL = '[Kit Models] Update Fail';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchKitModels(kitID: number) {
    this.store.dispatch(createAction(KitModelsActions.FETCH, kitID));
  }

}
