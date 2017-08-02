import { Action } from '@ngrx/store';

import { ModelsActions } from './models.actions';
import { Models } from '../../models/models';

const initialState = {
  results: {},
  filtered: [],
  showAddNew: false
};

export function modelsReducer(models: Models = initialState, action: Action): Models {
  switch (action.type) {
    case ModelsActions.FETCH_MODELS_SUCCESS:
      return {
        ...models,
        results: Object.assign({},
          action.payload.results.reduce((obj, model) => {
            obj[model.modelID] = model;
            return obj;
          }, {})
        ),
        filtered: action.payload.results,
        showAddNew: false
      };
    case ModelsActions.CREATE_MODEL_SUCCESS:
      return {
        ...models,
        results: {
          ...models.results,
          [action.payload.modelID]: action.payload
        }
      };
    case ModelsActions.FILTER_MODELS:
      return Object.assign({}, models, {
        filtered: Object.keys(models.results)
          .map((key) => models.results[key])
          .filter(model => model.name.toLowerCase().indexOf(action.payload.text.toLowerCase()) > -1 &&
            model.brandID === action.payload.brandID)
      });
    default:
      return models;
  }
}
