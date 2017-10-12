import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models';

@Injectable()
export class ModelsActions {

  static FETCH = type('[Models] Fetch');
  static FETCH_SUCCESS = type('[Models] Fetch Success');
  static FETCH_FAIL = type('[Models] Fetch Fail');

  static CREATE = type('[Models] Create');
  static CREATE_SUCCESS = type('[Models] Create Success');
  static CREATE_FAIL = type('[Models] Create Fail');

  static UPDATE = type('[Models] Update');
  static UPDATE_SUCCESS = type('[Models] Update Success');
  static UPDATE_FAIL = type('[Models] Update Fail');

  static DELETE = type('[Models] Delete');
  static DELETE_SUCCESS = type('[Models] Delete Success');
  static DELETE_FAIL = type('[Models] Delete Fail');

  static FILTER = type('[Models] Filter');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchModels() {
    this.store.dispatch(createAction(ModelsActions.FETCH));
  }

  // pop determines whether the nav should poped after the model is created.
  createModel(name: string, brandID: number, pop: boolean = false) {
    this.store.dispatch(createAction(ModelsActions.CREATE, { model: { name, brandID }, pop }));
  }

  updateModel(model: any) {
    this.store.dispatch(createAction(ModelsActions.UPDATE, model));
  }

  deleteModel(modelID: number) {
    this.store.dispatch(createAction(ModelsActions.DELETE, modelID));
  }

  filterModels(brandID: number, text: string = '') {
    this.store.dispatch(createAction(ModelsActions.FILTER, { brandID, text }));
  }
}
