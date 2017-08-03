import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class ModelsActions {

  static FETCH = '[Models] Fetch';
  static FETCH_SUCCESS = '[Models] Fetch Success';
  static FETCH_FAIL = '[Models] Fetch Fail';

  static CREATE = '[Models] Create';
  static CREATE_SUCCESS = '[Models] Create Success';
  static CREATE_FAIL = '[Models] Create Fail';

  static FILTER = '[Models] Filter';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchModels() {
    this.store.dispatch(createAction(ModelsActions.FETCH));
  }

  createModel(name: string, brandID: number) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingModel));
    this.store.dispatch(createAction(ModelsActions.CREATE, { name, brandID }));
  }

  filterModels(brandID: number, text: string = '') {
    this.store.dispatch(createAction(ModelsActions.FILTER, { brandID, text }));
  }
}
