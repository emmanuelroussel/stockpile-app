import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';

import { createAction } from '../create-action';
import { ModelsActions } from './models.actions';
import { AppActions } from '../app/app.actions.ts';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class ModelsEffects {
  constructor(
    public actions$: Actions,
    public itemPropertyData: ItemPropertyData,
    public app: App
  ) {}

  /**
   * Fetches models.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(ModelsActions.FETCH_MODELS)
    .mergeMap(action => this.itemPropertyData.getModels()
      .map(res => createAction(ModelsActions.FETCH_MODELS_SUCCESS, res))
      .catch(err => Observable.of(createAction(ModelsActions.FETCH_MODELS_ERROR, err)))
    );

  /**
   * Creates model.
   */
  @Effect()
  create$ = this.actions$
    .ofType(ModelsActions.CREATE_MODEL)
    .mergeMap(action => this.itemPropertyData.addModel(action.payload)
      .concatMap(res => [
        createAction(ModelsActions.CREATE_MODEL_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(ModelsActions.CREATE_MODEL_ERROR, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * On successful model creation, pop nav.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(ModelsActions.CREATE_MODEL_SUCCESS)
    .mergeMap(action => Observable.of(AppActions.POP_NAV))
    .delay(1);

  /**
   * On unsuccessful operations, show message.
   */
  @Effect()
  errors$ = this.actions$
    .ofType(
      ModelsActions.FETCH_MODELS_ERROR,
      ModelsActions.CREATE_MODEL_ERROR,
    )
    .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
    .delay(1);
}
