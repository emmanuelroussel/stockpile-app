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
      return {
        ...kitModels,
        results: {
          [action.payload.kitID]: action.payload.results
        },
        tempKitModels: action.payload.results,
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
    case KitModelsActions.UPDATE_TEMP:
      return {
        ...kitModels,
        tempKitModels: kitModels.tempKitModels.map(kitModel => {
          return kitModel.modelID === action.payload.modelID ? action.payload : kitModel;
        })
      };
    case KitModelsActions.RESET_TEMP_KIT_MODELS:
      return { ...kitModels, tempKitModels: [] };
    default:
      return kitModels;
  }
}
