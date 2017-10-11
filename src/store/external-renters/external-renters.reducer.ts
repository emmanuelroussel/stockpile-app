import { Action } from '@ngrx/store';

import { ExternalRentersActions } from './external-renters.actions';
import { ExternalRenters } from '../../models/external-renters';

const initialState = {
  results: {},
  filtered: [],
  showAddNew: false,
  showLoadingSpinner: false
};

export function externalRentersReducer(externalRenters: ExternalRenters = initialState, action: Action): ExternalRenters {
  switch (action.type) {
    case ExternalRentersActions.FETCH:
      return { ...externalRenters, showLoadingSpinner: true };
    case ExternalRentersActions.FETCH_SUCCESS:
      return {
        ...externalRenters,
        results: Object.assign({},
          externalRenters.results,
          action.payload.results.reduce((obj, externalRenter) => {
            obj[externalRenter.externalRenterID] = externalRenter;
            return obj;
          }, {})
        ),
        filtered: action.payload.results,
        showAddNew: false,
        showLoadingSpinner: false
      };
    case ExternalRentersActions.CREATE_SUCCESS:
    case ExternalRentersActions.UPDATE_SUCCESS:
      return {
        ...externalRenters,
        results: {
          ...externalRenters.results,
          [action.payload.externalRenterID]: action.payload
        }
      };
    case ExternalRentersActions.DELETE_SUCCESS:
      const results = Object.assign({}, externalRenters.results);
      delete results[action.payload.id];
      return {
        ...externalRenters,
        results
      };
    case ExternalRentersActions.FILTER:
      const filtered = Object.keys(externalRenters.results)
        .map((key) => externalRenters.results[key])
        .filter(externalRenter => externalRenter.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1);

      return Object.assign({}, externalRenters, {
        filtered: filtered,
        showAddNew: !filtered.find(externalRenter => {
          return externalRenter.name.toLowerCase() === action.payload.toLowerCase() || action.payload === '';
        })
      });
    default:
      return externalRenters;
  }
}
