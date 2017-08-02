import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class LayoutActions {

  static SHOW_LOADING_MESSAGE = 'SHOW_LOADING_MESSAGE';
  static HIDE_LOADING_MESSAGE = 'HIDE_LOADING_MESSAGE';

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
