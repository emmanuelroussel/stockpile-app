import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, CustomField, CustomFields } from '../models';

@Injectable()
export class CustomFieldsService {

  constructor(private store: Store<AppState>) {}

  getCustomFields(): Observable<CustomFields> {
    return this.store.select(appState => appState.customFields);
  }

  getCustomField(customFieldID: number): Observable<CustomField> {
    return this.store.select(appState => appState.customFields.results[customFieldID]);
  }
}
