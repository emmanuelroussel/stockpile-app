import { Action } from '@ngrx/store';

import { CategoriesActions } from './categories.actions';
import { Categories } from '../../models/categories';

const initialState = {
  results: {},
  filtered: [],
  showAddNew: false
};

export function categoriesReducer(categories: Categories = initialState, action: Action): Categories {
  switch (action.type) {
    case CategoriesActions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...categories,
        results: Object.assign({},
          categories.results,
          action.payload.results.reduce((obj, category) => {
            obj[category.categoryID] = category;
            return obj;
          }, {})
        ),
        filtered: action.payload.results,
        showAddNew: false
      };
    case CategoriesActions.CREATE_CATEGORY_SUCCESS:
      return {
        ...categories,
        results: {
          ...categories.results,
          [action.payload.categoryID]: action.payload
        }
      };
    case CategoriesActions.FILTER_CATEGORIES:
      return Object.assign({}, categories, {
        filtered: Object.keys(categories.results)
          .map((key) => categories.results[key])
          .filter(category => category.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1)
      });
    default:
      return categories;
  }
}
