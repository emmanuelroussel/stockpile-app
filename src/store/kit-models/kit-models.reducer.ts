import { Action } from '@ngrx/store';

import { KitModelsActions } from './kit-models.actions';
import { KitModels } from '../../models/kit-models';

const initialState = {
  results: {},
  tempKitModels: [],
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
      return {
        ...kitModels,
        results,
        tempKitModels: action.payload.results,
        showLoadingSpinner: false
      };
    case KitModelsActions.UPDATE_SUCCESS:
      const previousKitModels = kitModels.results[action.payload.kitID] || [];
      const newKitModels = action.payload.results.filter(kitModel => kitModel.kitID != null);
      const existingKitModels = previousKitModels.filter(kitModel => {
        return !action.payload.kitModelsToDelete.find(id => id === kitModel.modelID);
      });

      return {
        ...kitModels,
        results: {
          [action.payload.kitID]: [...existingKitModels, ...newKitModels]
        },
        tempKitModels: [...existingKitModels, ...newKitModels],
      };
    case KitModelsActions.DELETE_TEMP:
      return {
        ...kitModels,
        tempKitModels: kitModels.tempKitModels.filter(kitModel => kitModel.modelID !== action.payload),
      };
    case KitModelsActions.CREATE_TEMP:
      return {
        ...kitModels,
        tempKitModels: [...kitModels.tempKitModels, action.payload],
      }
    case KitModelsActions.RESET_TEMP_KIT_MODELS:
      return { ...kitModels, tempKitModels: [] };
    default:
      return kitModels;
  }
}
