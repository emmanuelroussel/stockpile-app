import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class KitsActions {

  static FETCH = type('[Kits] Fetch');
  static FETCH_SUCCESS = type('[Kits] Fetch Success');
  static FETCH_FAIL = type('[Kits] Fetch Fail');

  static DELETE = type('[Kits] Delete');
  static DELETE_SUCCESS = type('[Kits] Delete Success');
  static DELETE_FAIL = type('[Kits] Delete Fail');

  static CREATE = type('[Kits] Create');
  static CREATE_SUCCESS = type('[Kits] Create Success');
  static CREATE_FAIL = type('[Kits] Create Fail');

  static UPDATE = type('[Kits] Update');
  static UPDATE_SUCCESS = type('[Kits] Update Success');
  static UPDATE_FAIL = type('[Kits] Update Fail');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchKits() {
    this.store.dispatch(createAction(KitsActions.FETCH));
  }

  deleteKit(kitID: number) {
    this.store.dispatch(createAction(KitsActions.DELETE, kitID));
  }

  createKit(kit: any, kitModels: any) {
    this.store.dispatch(createAction(KitsActions.CREATE, { kit, kitModels }));
  }

  updateKit(kit: any, kitModelsToCreate: any, kitModelsToDelete: any) {
    this.store.dispatch(createAction(KitsActions.UPDATE, { kit, kitModelsToCreate, kitModelsToDelete }));
  }
}
