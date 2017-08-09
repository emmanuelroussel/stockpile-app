import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { createAction } from '../create-action';
import { ModelsActions } from './models.actions';
import { AppActions } from '../app/app.actions.ts';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class ModelsEffects {
  constructor(
    public actions$: Actions,
    public itemPropertyData: ItemPropertyData
  ) {}

  /**
   * Fetches models.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(ModelsActions.FETCH)
    .mergeMap(action => this.itemPropertyData.getModels()
      .map(res => createAction(ModelsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(ModelsActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates model.
   */
  @Effect()
  create$ = this.actions$
    .ofType(ModelsActions.CREATE)
    .mergeMap(action => this.itemPropertyData.addModel(action.payload)
      .concatMap(res => [
        createAction(ModelsActions.CREATE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(ModelsActions.CREATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );
}
