import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { createAction } from '../create-action';
import { ModelsActions } from './models.actions';
import { AppActions } from '../app/app.actions';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

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
    .mergeMap(action => this.itemPropertyData.createModel(action.payload.model)
      .concatMap(res => {
        let success = [
          createAction(ModelsActions.CREATE_SUCCESS, res),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.modelAdded),
        ];

        if (action.payload.pop) {
          success.push(createAction(AppActions.POP_NAV));
        }

        return success;
      })
      .catch(err => Observable.of(
        createAction(ModelsActions.CREATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Updates category.
   */
  @Effect()
  update$ = this.actions$
    .ofType(ModelsActions.UPDATE)
    .mergeMap(action => this.itemPropertyData.updateModel(action.payload, action.payload.modelID)
      .concatMap(res => [
        createAction(ModelsActions.UPDATE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.modelEdited),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(ModelsActions.UPDATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Deletes category.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(ModelsActions.DELETE)
    .mergeMap(action => this.itemPropertyData.deleteModel(action.payload)
      .concatMap(res => [
        createAction(ModelsActions.DELETE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.modelDeleted),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(ModelsActions.DELETE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );
}
