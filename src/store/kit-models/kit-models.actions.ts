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

  static DELETE_TEMP = type('[Kit Models] Delete Temp');
  static CREATE_TEMP = type('[Kit Models] Create Temp');
  static UPDATE_TEMP = type('[Kit Models] Update Temp');
  static RESET_TEMP_KIT_MODELS = type('[Kit Models] Reset Temp');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchKitModels(kitID: number) {
    this.store.dispatch(createAction(KitModelsActions.FETCH, kitID));
  }

  deleteTemp(modelID: number) {
    this.store.dispatch(createAction(KitModelsActions.DELETE_TEMP, modelID));
  }

  createTemp(kitModel: any) {
    this.store.dispatch(createAction(KitModelsActions.CREATE_TEMP, kitModel));
  }

  updateTemp(kitModel: any) {
    this.store.dispatch(createAction(KitModelsActions.UPDATE_TEMP, kitModel));
  }

  resetTempKitModels() {
    this.store.dispatch(createAction(KitModelsActions.RESET_TEMP_KIT_MODELS));
  }
}
