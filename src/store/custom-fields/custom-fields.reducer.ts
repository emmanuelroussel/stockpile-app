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
          action.payload.results.reduce((obj, customField) => {
            obj[customField.customFieldID] = customField;
            return obj;
          }, {})
        ),
        showLoadingSpinner: false
      };
    case CustomFieldsActions.FETCH_FAIL:
      return { ...customFields, showLoadingSpinner: false };
    default:
      return customFields;
  }
}
