import { Action } from '@ngrx/store';

import { UserActions } from './user.actions';
import { User } from '../../models/user';

const initialState = {
  userID: null,
  firstName: '',
  lastName: '',
  email: '',
  organizationID: null,
  archived: '',
  loading: false
};

export function userReducer(user: User = initialState, action: Action): User {
  switch (action.type) {
    case UserActions.LOGOUT_USER:
      return initialState;
    case UserActions.FETCH_USER_SUCCESS:
    case UserActions.UPDATE_USER_SUCCESS:
      return action.payload;
    default:
      return user;
  }
}
