import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, Categories } from '../models';

@Injectable()
export class CategoriesService {

  constructor(private store: Store<AppState>) {}

  getCategories(): Observable<Categories> {
    return this.store.select(appState => appState.categories);
  }

  getShouldShowAddNew(): Observable<boolean> {
    return this.store.select(appState => appState.categories.showAddNew);
  }
}
