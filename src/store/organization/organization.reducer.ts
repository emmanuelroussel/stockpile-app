import { Action } from '@ngrx/store';

import { OrganizationActions } from './organization.actions';
import { UserActions } from '../user/user.actions';
import { Organization } from '../../models/organization';

const initialState = {
  name: '',
  organizationID: null,
};

export function organizationReducer(organization: Organization = initialState, action: Action): Organization {
  switch (action.type) {
    case OrganizationActions.FETCH_SUCCESS:
      return action.payload;
    case UserActions.LOGOUT_SUCCESS:
      return initialState;
    default:
      return organization;
  }
}
