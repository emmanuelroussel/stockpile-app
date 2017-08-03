import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';

import { createAction } from '../create-action';
import { BrandsActions } from './brands.actions';
import { AppActions } from '../app/app.actions.ts';
import { ItemPropertyData } from '../../providers/item-property-data';
import { LayoutActions } from '../layout/layout.actions';

@Injectable()
export class BrandsEffects {
  constructor(
    public actions$: Actions,
    public itemPropertyData: ItemPropertyData,
    public app: App
  ) {}

  /**
   * Fetches brands.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(BrandsActions.FETCH)
    .mergeMap(action => this.itemPropertyData.getBrands()
      .map(res => createAction(BrandsActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(createAction(BrandsActions.FETCH_FAIL, err)))
    );

  /**
   * Creates brand.
   */
  @Effect()
  create$ = this.actions$
    .ofType(BrandsActions.CREATE)
    .mergeMap(action => this.itemPropertyData.addBrand(action.payload)
      .concatMap(res => [
        createAction(BrandsActions.CREATE_SUCCESS, res),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ])
      .catch(err => Observable.of(
        createAction(BrandsActions.CREATE_FAIL, err),
        createAction(LayoutActions.HIDE_LOADING_MESSAGE)
      ))
    );

  /**
   * On successful brand creation, pop nav.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(BrandsActions.CREATE_SUCCESS)
    .mergeMap(action => Observable.of(AppActions.POP_NAV))
    .delay(1);

  /**
   * On unsuccessful operations, show message.
   */
  @Effect()
  errors$ = this.actions$
    .ofType(
      BrandsActions.FETCH_FAIL,
      BrandsActions.CREATE_FAIL,
    )
    .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
    .delay(1);
}
