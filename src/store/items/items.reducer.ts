import { Action } from '@ngrx/store';

import { ItemsActions } from './items.actions';
import { Items } from '../../models/items';

const initialState = {
  results: {},
  tempItem: {},
  tempItemCustomFields: [],
  rentals: {},
  showLoadingSpinner: false,
  filters: {}
};

export function itemsReducer(items: Items = initialState, action: Action): Items {
  switch (action.type) {
    case ItemsActions.FETCH:
      return { ...items, showLoadingSpinner: true };
    case ItemsActions.FETCH_SUCCESS:
      return {
        ...items,
        results: Object.assign({},
          action.payload.results.reduce((obj, item) => {
            obj[item.barcode] = item;
            return obj;
          }, {})
        ),
        showLoadingSpinner: false
      };
    case ItemsActions.FETCH_FAIL:
      return { ...items, showLoadingSpinner: false };
    case ItemsActions.RESET:
      return {
        ...initialState,
        filters: items.filters
      };
    case ItemsActions.UPDATE_TEMP:
      return {
        ...items,
        tempItem: Object.assign({}, items.tempItem, action.payload),
      };
    case ItemsActions.START_RENTAL_SUCCESS:
      return {
        ...items,
        rentals: {
          [action.payload.barcode]: action.payload
        }
      };
    case ItemsActions.RESET_RENTALS:
    case ItemsActions.RETURN_SUCCESS:
    case ItemsActions.RENT_SUCCESS:
      return { ...items, rentals: {} };
    case ItemsActions.ADD_TO_RENTALS_SUCCESS:
      return {
        ...items,
        rentals: {
          ...items.rentals,
          [action.payload.barcode]: action.payload
        }
      };
    case ItemsActions.REMOVE_FROM_RENTALS:
      const rentals = Object.assign({}, items.rentals);
      delete rentals[action.payload];
      return { ...items, rentals };
    case ItemsActions.RESET_TEMP_ITEM:
      return { ...items, tempItem: {} };
    case ItemsActions.RESET_TEMP_ITEM_CUSTOM_FIELDS:
      return { ...items, tempItemCustomFields: [] };
    case ItemsActions.FETCH_ITEM_CUSTOM_FIELDS:
    case ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY:
      return {
        ...items,
        showLoadingSpinner: true,
        tempItemCustomFields: []
      };
    case ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_FAIL:
    case ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY_FAIL:
      return { ...items, showLoadingSpinner: false };
    case ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_SUCCESS:
    case ItemsActions.FETCH_ITEM_CUSTOM_FIELDS_BY_CATEGORY_SUCCESS:
      return {
        ...items,
        tempItemCustomFields: action.payload.results,
        showLoadingSpinner: false
      };
    case ItemsActions.UPDATE_FILTERS:
      return {
        ...items,
        filters: {
          ...items.filters,
          ...action.payload
        }
      };
    default:
      return items;
  }
}
