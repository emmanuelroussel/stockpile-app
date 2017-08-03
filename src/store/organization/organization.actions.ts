import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class OrganizationActions {

  static FETCH = '[Organization] Fetch';
  static FETCH_SUCCESS = '[Organization] Fetch Success';
  static FETCH_FAIL = '[Organization] Fetch Fail';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchOrganization() {
    this.store.dispatch(createAction(OrganizationActions.FETCH));
  }

}
