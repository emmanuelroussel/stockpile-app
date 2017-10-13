import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models';

@Injectable()
export class CustomFieldCategoriesActions {

  static FETCH = type('[Custom Field Categories] Fetch');
  static FETCH_SUCCESS = type('[Custom Field Categories] Fetch Success');
  static FETCH_FAIL = type('[Custom Field Categories] Fetch Fail');

  static UPDATE = type('[Custom Field Categories] Update');
  static UPDATE_SUCCESS = type('[Custom Field Categories] Update Success');
  static UPDATE_FAIL = type('[Custom Field Categories] Update Fail');

  static DELETE_TEMP = type('[Custom Field Categories] Delete Temp');
  static CREATE_TEMP = type('[Custom Field Categories] Create Temp');
  static UPDATE_TEMP = type('[Custom Field Categories] Update Temp');
  static RESET_TEMP_CUSTOM_FIELD_CATEGORIES = type('[Custom Field Categories] Reset Temp');

  constructor(
    private store: Store<AppState>
  ) {}

  fetchCustomFieldCategories(customFieldID: number) {
    this.store.dispatch(createAction(CustomFieldCategoriesActions.FETCH, customFieldID));
  }

  updateTemp(categories: Array<any>) {
    this.store.dispatch(createAction(CustomFieldCategoriesActions.UPDATE_TEMP, categories));
  }

  resetTempCustomFieldCategories() {
    this.store.dispatch(createAction(CustomFieldCategoriesActions.RESET_TEMP_CUSTOM_FIELD_CATEGORIES));
  }
}
