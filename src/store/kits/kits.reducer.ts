import { Action } from '@ngrx/store';

import { KitsActions } from './kits.actions';
import { Kits } from '../../models/kits';

const initialState = {
  results: {}
};

export function kitsReducer(kits: Kits = initialState, action: Action): Kits {
  switch (action.type) {
    case KitsActions.FETCH_KITS_SUCCESS:
      return {
        results: Object.assign({},
          kits.results,
          action.payload.results.reduce((obj, kit) => {
            obj[kit.kitID] = kit;
            return obj;
          }, {})
        )
      };
    case KitsActions.DELETE_KIT_SUCCESS:
      const results = Object.assign({}, kits.results);
      delete results[action.payload.id];
      return { results };
    case KitsActions.CREATE_KIT_SUCCESS:
    case KitsActions.UPDATE_KIT_SUCCESS:
      return {
        results: {
          ...kits.results,
          [action.payload.kit.kitID]: action.payload.kit
        }
      };
    default:
      return kits;
  }
}
