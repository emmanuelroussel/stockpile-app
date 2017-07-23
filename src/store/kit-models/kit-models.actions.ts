import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';

@Injectable()
export class KitModelsActions {

  static FETCH_KIT_MODELS = 'FETCH_KIT_MODELS';
  static FETCH_KIT_MODELS_SUCCESS = 'FETCH_KIT_MODELS_SUCCESS';
  static FETCH_KIT_MODELS_ERROR = 'FETCH_KIT_MODELS_ERROR';

  static UPDATE_KIT_MODELS = 'UPDATE_KIT_MODELS';
  static UPDATE_KIT_MODELS_SUCCESS = 'UPDATE_KIT_MODELS_SUCCESS';
  static UPDATE_KIT_MODELS_ERROR = 'UPDATE_KIT_MODELS_ERROR';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchKitModels(kitID: number) {
    this.store.dispatch(createAction(KitModelsActions.FETCH_KIT_MODELS, kitID));
  }

}
