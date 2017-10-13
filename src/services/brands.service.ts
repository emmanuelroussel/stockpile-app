import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, Brands } from '../models';

@Injectable()
export class BrandsService {

  constructor(private store: Store<AppState>) {}

  getBrands(): Observable<Brands> {
    return this.store.select(appState => appState.brands);
  }

  getShouldShowAddNew(): Observable<boolean> {
    return this.store.select(appState => appState.brands.showAddNew);
  }
}
