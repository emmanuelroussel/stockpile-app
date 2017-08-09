import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class ModelsActions {

  static FETCH = type('[Models] Fetch');
  static FETCH_SUCCESS = type('[Models] Fetch Success');
  static FETCH_FAIL = type('[Models] Fetch Fail');

  static CREATE = type('[Models] Create');
  static CREATE_SUCCESS = type('[Models] Create Success');
  static CREATE_FAIL = type('[Models] Create Fail');

  static FILTER = type('[Models] Filter');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchModels() {
    this.store.dispatch(createAction(ModelsActions.FETCH));
  }

  createModel(name: string, brandID: number) {
    this.store.dispatch(createAction(ModelsActions.CREATE, { name, brandID }));
  }

  filterModels(brandID: number, text: string = '') {
    this.store.dispatch(createAction(ModelsActions.FILTER, { brandID, text }));
  }
}
