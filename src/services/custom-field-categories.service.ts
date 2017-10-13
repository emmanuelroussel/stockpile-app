import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, CustomFieldCategory } from '../models';

@Injectable()
export class CustomFieldCategoriesService {

  constructor(private store: Store<AppState>) {}

  getCustomFieldCategories(customFieldID: number): Observable<Array<CustomFieldCategory>> {
    return this.store.select(appState => appState.customFieldCategories.results[customFieldID]);
  }

  getShouldShowLoadingSpinner(): Observable<boolean> {
    return this.store.select(appState => appState.customFieldCategories.showLoadingSpinner);
  }

  getTempCustomFieldCategories(): Observable<Array<CustomFieldCategory>> {
    return this.store.select(appState => appState.customFieldCategories.tempCustomFieldCategories);
  }
}
