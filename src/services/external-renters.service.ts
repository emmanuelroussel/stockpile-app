import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, ExternalRenter, ExternalRenters } from '../models';

@Injectable()
export class ExternalRentersService {

  constructor(private store: Store<AppState>) {}

  getExternalRenters(): Observable<ExternalRenters> {
    return this.store.select(appState => appState.externalRenters);
  }

  getExternalRenter(externalRenterID: number): Observable<ExternalRenter> {
    return this.store.select(appState => appState.externalRenters.results[externalRenterID]);
  }

  getShouldShowAddNew(): Observable<boolean> {
    return this.store.select(appState => appState.externalRenters.showAddNew);
  }
}
