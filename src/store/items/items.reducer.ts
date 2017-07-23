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
  display: []
};

export function itemsReducer(items: Items = initialState, action: Action): Items {
  switch (action.type) {
    case ItemsActions.FETCH_ITEMS_SUCCESS:
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
        display: [...items.display, ...action.payload.results]
      };
    case ItemsActions.CREATE_ITEM_SUCCESS:
      return {
        ...items,
        results: {
          ...items.results,
          [action.payload.barcode]: action.payload
        },
        display: [...items.display, action.payload]
      };
    case ItemsActions.UPDATE_ITEM_SUCCESS:
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
        })
      };
    case ItemsActions.DELETE_ITEM_SUCCESS:
      const results = Object.assign({}, items.results);
      delete results[action.payload.id];
      return { ...items, results };
    case ItemsActions.RESET_ITEMS:
      return initialState;
    case ItemsActions.UPDATE_TEMP_ITEM:
      return {
        ...items,
        tempItem: Object.assign({}, items.tempItem, action.payload)
      };
    case ItemsActions.START_RENTAL_SUCCESS:
      return {
        ...items,
        rentals: {
          [action.payload.barcode]: action.payload
        }
      };
    case ItemsActions.RESET_RENTALS:
    case ItemsActions.RETURN_ITEMS_SUCCESS:
    case ItemsActions.RENT_ITEMS_SUCCESS:
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
