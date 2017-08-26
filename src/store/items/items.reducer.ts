import { Action } from '@ngrx/store';

import { ItemsActions } from './items.actions';
import { Items } from '../../models/items';
import { paginationLimit } from '../../constants';

const initialState = {
  results: {},
  offset: 0,
  loadMoreItems: true,
  showAddNew: false,
  tempItem: {},
  rentals: {},
  display: [],
  showLoadingSpinner: false
};

export function itemsReducer(items: Items = initialState, action: Action): Items {
  switch (action.type) {
    case ItemsActions.FETCH:
      // Show loading only if there are no items, else it is the infinite scroll
      return { ...items, showLoadingSpinner: items.display.length ? false : true };
    case ItemsActions.FETCH_SUCCESS:
      return {
        ...items,
        results: Object.assign({},
          items.results,
          action.payload.results.reduce((obj, item) => {
            obj[item.barcode] = item;
            return obj;
          }, {})
        ),
        showAddNew: (items.offset === 0 && action.payload.results.length === 0),
        offset: items.offset + paginationLimit,
        loadMoreItems: !(action.payload.results.length < paginationLimit),
        display: [...items.display, ...action.payload.results],
        showLoadingSpinner: false
      };
    case ItemsActions.CREATE_SUCCESS:
      return {
        ...items,
        results: {
          ...items.results,
          [action.payload.barcode]: action.payload
        },
        display: [...items.display, action.payload],
        tempItem: {}
      };
    case ItemsActions.UPDATE_SUCCESS:
      return {
        ...items,
        results: {
          ...items.results,
          [action.payload.barcode]: action.payload
        },
        display: items.display.map(item => {
          if (item.barcode === action.payload.barcode) {
            return action.payload;
          } else {
            return item;
          }
        }),
        tempItem: {}
      };
    case ItemsActions.DELETE_SUCCESS:
      const results = Object.assign({}, items.results);
      delete results[action.payload.id];
      return {
        ...items,
        results,
        display: items.display.filter(item => item.barcode !== action.payload.id),
        tempItem: {}
      };
    case ItemsActions.RESET:
      return initialState;
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
    default:
      return items;
  }
}
