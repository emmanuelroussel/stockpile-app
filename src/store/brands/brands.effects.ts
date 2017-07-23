import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';

import { createAction } from '../create-action';
import { BrandsActions } from './brands.actions';
import { AppActions } from '../app/app.actions.ts';
import { ItemPropertyData } from '../../providers/item-property-data';

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
    .ofType(BrandsActions.FETCH_BRANDS)
    .mergeMap(action => this.itemPropertyData.getBrands()
      .map(res => createAction(BrandsActions.FETCH_BRANDS_SUCCESS, res))
      .catch(err => Observable.of(createAction(BrandsActions.FETCH_BRANDS_ERROR, err)))
    );

  /**
   * Creates brand.
   */
  @Effect()
  create$ = this.actions$
    .ofType(BrandsActions.CREATE_BRAND)
    .mergeMap(action => this.itemPropertyData.addBrand(action.payload)
      .map(res => createAction(BrandsActions.CREATE_BRAND_SUCCESS, res))
      .catch(err => Observable.of(createAction(BrandsActions.CREATE_BRAND_ERROR, err)))
    );

  /**
   * On successful brand creation, pop nav.
   */
  @Effect()
  createSuccess$ = this.actions$
    .ofType(BrandsActions.CREATE_BRAND_SUCCESS)
    .mergeMap(action => Observable.of(AppActions.POP_NAV))
    .delay(1);
}
