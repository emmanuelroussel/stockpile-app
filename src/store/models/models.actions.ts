import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../create-action';
import { AppState } from '../../models/app-state';
import { LayoutActions } from '../layout/layout.actions';
import { LoadingMessages } from '../../constants';

@Injectable()
export class ModelsActions {

  static FETCH_MODELS = 'FETCH_MODELS';
  static FETCH_MODELS_SUCCESS = 'FETCH_MODELS_SUCCESS';
  static FETCH_MODELS_ERROR = 'FETCH_MODELS_ERROR';

  static CREATE_MODEL = 'CREATE_MODEL';
  static CREATE_MODEL_SUCCESS = 'CREATE_MODEL_SUCCESS';
  static CREATE_MODEL_ERROR = 'CREATE_MODEL_ERROR';

  static FILTER_MODELS = 'FILTER_MODELS';

  constructor(
    private store: Store<AppState>
  ) {}

  fetchModels() {
    this.store.dispatch(createAction(ModelsActions.FETCH_MODELS));
  }

  createModel(name: string, brandID: number) {
    this.store.dispatch(createAction(LayoutActions.SHOW_LOADING_MESSAGE, LoadingMessages.creatingModel));
    this.store.dispatch(createAction(ModelsActions.CREATE_MODEL, { name, brandID }));
  }

  filterModels(brandID: number, text: string = '') {
    this.store.dispatch(createAction(ModelsActions.FILTER_MODELS, { brandID, text }));
  }
}
