import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class KitsActions {

  static FETCH = '[Kits] Fetch';
  static FETCH_SUCCESS = '[Kits] Fetch Success';
  static FETCH_FAIL = '[Kits] Fetch Fail';

  static DELETE = '[Kits] Delete';
  static DELETE_SUCCESS = '[Kits] Delete Success';
  static DELETE_FAIL = '[Kits] Delete Fail';

  static CREATE = '[Kits] Create';
  static CREATE_SUCCESS = '[Kits] Create Success';
  static CREATE_FAIL = '[Kits] Create Fail';

  static UPDATE = '[Kits] Update';
  static UPDATE_SUCCESS = '[Kits] Update Success';
  static UPDATE_FAIL = '[Kits] Update Fail';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchKits() {
    this.store.dispatch(createAction(KitsActions.FETCH));
  }

  deleteKit(kitID: number) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.deletingKit));
    this.store.dispatch(createAction(KitsActions.DELETE, kitID));
  }

  createKit(kit: any, kitModels: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingKit));
    this.store.dispatch(createAction(KitsActions.CREATE, { kit, kitModels }));
  }

  updateKit(kit: any, kitModelsToCreate: any, kitModelsToDelete: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.updatingKit));
    this.store.dispatch(createAction(KitsActions.UPDATE, { kit, kitModelsToCreate, kitModelsToDelete }));
  }
}
