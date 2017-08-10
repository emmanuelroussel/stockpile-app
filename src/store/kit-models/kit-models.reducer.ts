import { Action } from '@ngrx/store';

import { KitModelsActions } from './kit-models.actions';
import { KitModels } from '../../models/kit-models';

const initialState = {
  results: {},
  showLoadingSpinner: false
};

export function kitModelsReducer(kitModels: KitModels = initialState, action: Action): KitModels {
  switch (action.type) {
    case KitModelsActions.FETCH:
      return { ...kitModels, showLoadingSpinner: true };
    case KitModelsActions.FETCH_SUCCESS:
      let results = Object.assign({}, kitModels.results);
      if (action.payload.results.length) {
        results[action.payload.results[0].kitID] = action.payload.results;
      }
      return { results, showLoadingSpinner: false };
    default:
      return kitModels;
  }
}
