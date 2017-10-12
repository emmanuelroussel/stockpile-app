import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models';

@Injectable()
export class ExternalRentersActions {

  static FETCH = type('[External Renters] Fetch');
  static FETCH_SUCCESS = type('[External Renters] Fetch Success');
  static FETCH_FAIL = type('[External Renters] Fetch Fail');

  static CREATE = type('[External Renters] Create');
  static CREATE_SUCCESS = type('[External Renters] Create Success');
  static CREATE_FAIL = type('[External Renters] Create Fail');

  static UPDATE = type('[External Renters] Update');
  static UPDATE_SUCCESS = type('[External Renters] Update Success');
  static UPDATE_FAIL = type('[External Renters] Update Fail');

  static DELETE = type('[External Renters] Delete');
  static DELETE_SUCCESS = type('[External Renters] Delete Success');
  static DELETE_FAIL = type('[External Renters] Delete Fail');

  static FILTER = type('[External Renters] Filter');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchExternalRenters() {
    this.store.dispatch(createAction(ExternalRentersActions.FETCH));
  }

  // pop determines whether the nav should poped after the brand is created.
  createExternalRenter(externalRenter: any, pop: boolean = false) {
    this.store.dispatch(createAction(ExternalRentersActions.CREATE, { externalRenter, pop }));
  }

  updateExternalRenter(externalRenter: any) {
    this.store.dispatch(createAction(ExternalRentersActions.UPDATE, externalRenter));
  }

  deleteExternalRenter(externalRenterID: number) {
    this.store.dispatch(createAction(ExternalRentersActions.DELETE, externalRenterID));
  }

  filterExternalRenters(text: string) {
    this.store.dispatch(createAction(ExternalRentersActions.FILTER, text));
  }
}
