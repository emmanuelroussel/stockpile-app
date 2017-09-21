import { Action } from '@ngrx/store';

import { CustomFieldsActions } from './custom-fields.actions';
import { CustomFields } from '../../models/custom-fields';

const initialState = {
  results: {},
  showLoadingSpinner: false,
};

export function customFieldsReducer(customFields: CustomFields = initialState, action: Action): CustomFields {
  switch (action.type) {
    case CustomFieldsActions.FETCH:
     return { ...customFields, showLoadingSpinner: true };
    case CustomFieldsActions.FETCH_SUCCESS:
      return {
        ...customFields,
        results: Object.assign({},
          customFields.results,
          action.payload.results.reduce((obj, customField) => {
            obj[customField.customFieldID] = customField;
            return obj;
          }, {})
        ),
        showLoadingSpinner: false
      };
    case CustomFieldsActions.FETCH_FAIL:
      return { ...customFields, loading: false };
    case CustomFieldsActions.DELETE_SUCCESS:
      const results = Object.assign({}, customFields.results);
      delete results[action.payload.id];
      return { ...customFields, results };
    case CustomFieldsActions.CREATE_SUCCESS:
    case CustomFieldsActions.UPDATE_SUCCESS:
      return {
        ...customFields,
        results: {
          ...customFields.results,
          [action.payload.customFieldID]: action.payload
        }
      };
    default:
      return customFields;
  }
}
