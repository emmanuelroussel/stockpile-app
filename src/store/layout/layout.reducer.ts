import { Action } from '@ngrx/store';

import { LayoutActions } from './layout.actions';
import { Layout } from '../../models/layout';

const initialState = {
  loadingMessage: ''
};

export function layoutReducer(layout: Layout = initialState, action: Action): Layout {
  switch (action.type) {
    case LayoutActions.SHOW_LOADING_MESSAGE:
      return { loadingMessage: action.payload };
    case LayoutActions.HIDE_LOADING_MESSAGE:
      return { loadingMessage: '' };
    default:
      return layout;
  }
}
