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
          action.payload.results.reduce((obj, kit) => {
            obj[kit.kitID] = kit;
            return obj;
          }, {})
        ),
        showLoadingSpinner: false
      };
    case KitsActions.FETCH_FAIL:
      return { ...kits, showLoadingSpinner: false };
    default:
      return kits;
  }
}
