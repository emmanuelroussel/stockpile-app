import { Action } from '@ngrx/store';

import { CustomFieldCategoriesActions } from './custom-field-categories.actions';
import { CustomFieldCategories } from '../../models/custom-field-categories';

const initialState = {
  results: {},
  tempCustomFieldCategories: [],
  showLoadingSpinner: false
};

export function customFieldCategoriesReducer(
  customFieldCategories: CustomFieldCategories = initialState, action: Action
): CustomFieldCategories {
  switch (action.type) {
    case CustomFieldCategoriesActions.FETCH:
      return { ...customFieldCategories, showLoadingSpinner: true };
    case CustomFieldCategoriesActions.FETCH_SUCCESS:
      let results = Object.assign({}, customFieldCategories.results);
      if (action.payload.results.length) {
        results[action.payload.results[0].customFieldID] = action.payload.results;
      }
      return {
        ...customFieldCategories,
        results,
        tempCustomFieldCategories: action.payload.results,
        showLoadingSpinner: false
      };
    case CustomFieldCategoriesActions.UPDATE_SUCCESS:
      return {
        ...customFieldCategories,
        results: {
          [action.payload.customFieldID]: action.payload.results
        },
        tempCustomFieldCategories: action.payload.results,
      };
    case CustomFieldCategoriesActions.UPDATE_TEMP:
      return {
        ...customFieldCategories,
        tempCustomFieldCategories: action.payload
      };
    case CustomFieldCategoriesActions.RESET_TEMP_CUSTOM_FIELD_CATEGORIES:
      return { ...customFieldCategories, tempCustomFieldCategories: [] };
    default:
      return customFieldCategories;
  }
}
