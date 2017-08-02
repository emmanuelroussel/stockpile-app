import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class KitsActions {

  static FETCH_KITS = 'FETCH_KITS';
  static FETCH_KITS_SUCCESS = 'FETCH_KITS_SUCCESS';
  static FETCH_KITS_ERROR = 'FETCH_KITS_ERROR';

  static DELETE_KIT = 'DELETE_KIT';
  static DELETE_KIT_SUCCESS = 'DELETE_KIT_SUCCESS';
  static DELETE_KIT_ERROR = 'DELETE_KIT_ERROR';

  static CREATE_KIT = 'CREATE_KIT';
  static CREATE_KIT_SUCCESS = 'CREATE_KIT_SUCCESS';
  static CREATE_KIT_ERROR = 'CREATE_KIT_ERROR';

  static UPDATE_KIT = 'UPDATE_KIT';
  static UPDATE_KIT_SUCCESS = 'UPDATE_KIT_SUCCESS';
  static UPDATE_KIT_ERROR = 'UPDATE_KIT_ERROR';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchKits() {
    this.store.dispatch(createAction(KitsActions.FETCH_KITS));
  }

  deleteKit(kitID: number) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.deletingKit));
    this.store.dispatch(createAction(KitsActions.DELETE_KIT, kitID));
  }

  createKit(kit: any, kitModels: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingKit));
    this.store.dispatch(createAction(KitsActions.CREATE_KIT, { kit, kitModels }));
  }

  updateKit(kit: any, kitModelsToCreate: any, kitModelsToDelete: any) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.updatingKit));
    this.store.dispatch(createAction(KitsActions.UPDATE_KIT, { kit, kitModelsToCreate, kitModelsToDelete }));
  }
}
