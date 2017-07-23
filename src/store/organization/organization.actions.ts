import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class OrganizationActions {

  static FETCH_ORGANIZATION = 'FETCH_ORGANIZATION';
  static FETCH_ORGANIZATION_SUCCESS = 'FETCH_ORGANIZATION_SUCCESS';
  static FETCH_ORGANIZATION_ERROR = 'FETCH_ORGANIZATION_ERROR';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchOrganization() {
    this.store.dispatch(createAction(OrganizationActions.FETCH_ORGANIZATION));
  }

}
