import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class OrganizationActions {

  static FETCH = type('[Organization] Fetch');
  static FETCH_SUCCESS = type('[Organization] Fetch Success');
  static FETCH_FAIL = type('[Organization] Fetch Fail');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchOrganization() {
    this.store.dispatch(createAction(OrganizationActions.FETCH));
  }

}
