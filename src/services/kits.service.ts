import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, Kit, Kits } from '../models';

@Injectable()
export class KitsService {

  constructor(private store: Store<AppState>) {}

  getKits(): Observable<Kits> {
    return this.store.select(appState => appState.kits);
  }

  getKit(kitID: number): Observable<Kit> {
    return this.store.select(appState => appState.kits.results[kitID]);
  }
}
