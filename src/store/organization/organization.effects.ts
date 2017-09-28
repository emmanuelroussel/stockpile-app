import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { createAction } from '../create-action';
import { OrganizationActions } from './organization.actions';
import { AppActions } from '../app/app.actions';
import { UserData } from '../../providers/user-data';

@Injectable()
export class OrganizationEffects {
  constructor(
    public actions$: Actions,
    public userData: UserData
  ) { }

  /**
   * Fetches organization.
   */
  @Effect()
  fetch$ = this.actions$
    .ofType(OrganizationActions.FETCH)
    .mergeMap(action => this.userData.getOrganization(action.payload)
      .map(res => createAction(OrganizationActions.FETCH_SUCCESS, res))
      .catch(err => Observable.of(
        createAction(OrganizationActions.FETCH_FAIL, err),
        createAction(AppActions.SHOW_MESSAGE, err.message)
      ))
    );
}
