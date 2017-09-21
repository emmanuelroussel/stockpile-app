import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../models/app-state';
import { CustomFields, CustomField } from '../models/custom-fields';

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
