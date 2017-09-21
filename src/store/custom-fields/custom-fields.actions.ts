import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class CustomFieldsActions {

  static FETCH = type('[CustomFields] Fetch');
  static FETCH_SUCCESS = type('[CustomFields] Fetch Success');
  static FETCH_FAIL = type('[CustomFields] Fetch Fail');

  static DELETE = type('[CustomFields] Delete');
  static DELETE_SUCCESS = type('[CustomFields] Delete Success');
  static DELETE_FAIL = type('[CustomFields] Delete Fail');

  static CREATE = type('[CustomFields] Create');
  static CREATE_SUCCESS = type('[CustomFields] Create Success');
  static CREATE_FAIL = type('[CustomFields] Create Fail');

  static UPDATE = type('[CustomFields] Update');
  static UPDATE_SUCCESS = type('[CustomFields] Update Success');
  static UPDATE_FAIL = type('[CustomFields] Update Fail');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchCustomFields() {
    this.store.dispatch(createAction(CustomFieldsActions.FETCH));
  }

  deleteCustomField(customFieldID: number) {
    this.store.dispatch(createAction(CustomFieldsActions.DELETE, customFieldID));
  }

  createCustomField(customField: any) {
    this.store.dispatch(createAction(CustomFieldsActions.CREATE, customField));
  }

  updateCustomField(customField: any) {
    this.store.dispatch(createAction(CustomFieldsActions.UPDATE, customField));
  }
}
