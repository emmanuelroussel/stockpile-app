import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../models/app-state';
import { Categories } from '../models/categories';

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
