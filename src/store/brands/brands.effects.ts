import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { createAction } from '../create-action';
import { BrandsActions } from './brands.actions';
import { AppActions } from '../app/app.actions.ts';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';

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
    .mergeMap(action => this.itemPropertyData.createBrand(action.payload)
      .concatMap(res => [
        createAction(BrandsActions.CREATE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(BrandsActions.CREATE_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );
}
