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
    case KitModelsActions.UPDATE_SUCCESS:
      const newKitModels = action.payload.results.filter(kitModel => kitModel.kitID != null);
      const existingKitModels = kitModels.results[action.payload.kitID].filter(kitModel => {
        return !action.payload.kitModelsToDelete.find(id => id === kitModel.modelID);
      });

      return {
        ...kitModels,
        results: {
          [action.payload.kitID]: [...existingKitModels, ...newKitModels]
        }
      };
    default:
      return kitModels;
  }
}
