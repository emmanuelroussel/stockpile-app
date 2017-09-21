import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class CustomFieldCategoriesActions {

  static FETCH = type('[Custom Fields Categories] Fetch');
  static FETCH_SUCCESS = type('[Custom Fields Categories] Fetch Success');
  static FETCH_FAIL = type('[Custom Fields Categories] Fetch Fail');

  static UPDATE = type('[Custom Fields Categories] Update');
  static UPDATE_SUCCESS = type('[Custom Fields Categories] Update Success');
  static UPDATE_FAIL = type('[Custom Fields Categories] Update Fail');

  static DELETE_TEMP = type('[Custom Fields Categories] Delete Temp');
  static CREATE_TEMP = type('[Custom Fields Categories] Create Temp');
  static UPDATE_TEMP = type('[Custom Fields Categories] Update Temp');
  static RESET_TEMP_CUSTOM_FIELD_CATEGORIES = type('[Custom Fields Categories] Reset Temp');

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
