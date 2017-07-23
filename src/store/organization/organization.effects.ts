import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { createAction } from '../create-action';
import { OrganizationActions } from './organization.actions.ts';
import { AppActions } from '../app/app.actions.ts';
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
    .ofType(OrganizationActions.FETCH_ORGANIZATION)
    .mergeMap(action => this.userData.getOrganization(action.payload.organizationID)
      .map(res => createAction(OrganizationActions.FETCH_ORGANIZATION_SUCCESS, res))
      .catch(err => Observable.of(createAction(OrganizationActions.FETCH_ORGANIZATION_ERROR, err)))
    );

  /**
   * On unsuccessful operations, show message.
   */
  @Effect()
  errors$ = this.actions$
    .ofType(OrganizationActions.FETCH_ORGANIZATION_ERROR)
    .mergeMap(action => Observable.of(createAction(AppActions.SHOW_MESSAGE, action.payload.message)))
    .delay(1);
}
