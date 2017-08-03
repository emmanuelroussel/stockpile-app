import { Action } from '@ngrx/store';

import { KitsActions } from './kits.actions';
import { Kits } from '../../models/kits';

const initialState = {
  results: {},
  showLoadingSpinner: false,
};

export function kitsReducer(kits: Kits = initialState, action: Action): Kits {
  switch (action.type) {
    case KitsActions.FETCH:
     return { ...kits, showLoadingSpinner: true };
    case KitsActions.FETCH_SUCCESS:
      return {
        ...kits,
        results: Object.assign({},
          kits.results,
          action.payload.results.reduce((obj, kit) => {
            obj[kit.kitID] = kit;
            return obj;
          }, {})
        ),
        showLoadingSpinner: false
      };
    case KitsActions.FETCH_FAIL:
      return { ...kits, loading: false };
    case KitsActions.DELETE_SUCCESS:
      const results = Object.assign({}, kits.results);
      delete results[action.payload.id];
      return { ...kits, results };
    case KitsActions.CREATE_SUCCESS:
    case KitsActions.UPDATE_SUCCESS:
      return {
        ...kits,
        results: {
          ...kits.results,
          [action.payload.kit.kitID]: action.payload.kit
        }
      };
    default:
      return kits;
  }
}
