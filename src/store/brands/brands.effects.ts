import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { createAction } from '../create-action';
import { BrandsActions } from './brands.actions';
import { AppActions } from '../app/app.actions';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';
import { Messages } from '../../constants';

@Injectable()
export class BrandsEffects {
  constructor(
    public actions$: Actions,
    public itemPropertyData: ItemPropertyData
  ) {}

  /**
   * Fetches brands.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(BrandsActions.FETCH)
    .mergeMap(action => this.itemPropertyData.getBrands()
      .map(res => createAction(BrandsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(BrandsActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );

  /**
   * Creates brand.
   */
  @Effect()
  create$ = this.actions$
    .ofType(BrandsActions.CREATE)
    .mergeMap(action => this.itemPropertyData.createBrand({ name: action.payload.name })
      .concatMap(res => {
        let success = [
          createAction(BrandsActions.CREATE_SUCCESS, res),
          createAction(BrandsActions.FETCH),
          createAction(LayoutActions.HIDE_LOADING_MESSAGE),
          createAction(AppActions.SHOW_MESSAGE, Messages.brandAdded),
        ];

        if (action.payload.pop) {
          success.push(createAction(AppActions.POP_NAV));
        }

        return success;
      })
      .catch(err => Observable.of(
        createAction(BrandsActions.CREATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Updates brand.
   */
  @Effect()
  update$ = this.actions$
    .ofType(BrandsActions.UPDATE)
    .mergeMap(action => this.itemPropertyData.updateBrand(action.payload, action.payload.brandID)
      .concatMap(res => [
        createAction(BrandsActions.UPDATE_SUCCESS, res),
        createAction(BrandsActions.FETCH),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.brandEdited),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(BrandsActions.UPDATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * Deletes brand.
   */
  @Effect()
  delete$ = this.actions$
    .ofType(BrandsActions.DELETE)
    .mergeMap(action => this.itemPropertyData.deleteBrand(action.payload)
      .concatMap(res => [
        createAction(BrandsActions.DELETE_SUCCESS, res),
        createAction(BrandsActions.FETCH),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE),
        createAction(AppActions.SHOW_MESSAGE, Messages.brandDeleted),
        createAction(AppActions.POP_NAV)
      ])
      .catch(err => Observable.of(
        createAction(BrandsActions.DELETE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );
}
