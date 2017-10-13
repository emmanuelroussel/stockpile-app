import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, Organization } from '../models';

@Injectable()
export class OrganizationService {

  constructor(private store: Store<AppState>) {}

  getOrganization(): Observable<Organization> {
    return this.store.select(appState => appState.organization);
  }

}
