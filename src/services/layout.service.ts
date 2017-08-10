import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../models/app-state';

@Injectable()
export class LayoutService {

  constructor(private store: Store<AppState>) {}

  getLoadingMessage(): Observable<string> {
    return this.store.select(appState => appState.layout.loadingMessage);
  }
}
