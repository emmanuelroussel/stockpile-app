import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../models/app-state';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private store: Store<AppState>) {}

  getUser(): Observable<User> {
    return this.store.select(appState => appState.user)
      .filter(Boolean);
  }

  getLoading(): Observable<boolean> {
    return this.store.select(appState => appState.user.loading);
  }
}
