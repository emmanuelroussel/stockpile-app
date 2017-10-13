import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from '../../utils';

import { createAction } from '../create-action';
import { AppState } from '../../models';

@Injectable()
export class LayoutActions {

  static SHOW_LOADING_MESSAGE = type('[Layout] Show Loading Message');
  static HIDE_LOADING_MESSAGE = type('[Layout] Hide Loading Message');

  constructor(
    private store: Store<AppState>
  ) {}

  showLoadingMessage(message: string) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, message));
  }

  hideLoadingMessage() {
    this.store.dispatch(createAction(LayoutActions.HIDE_LOADING_MESSAGE));
  }
}
