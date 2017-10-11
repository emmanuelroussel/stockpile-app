import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../models/app-state';
import { Items, Item, ItemCustomField } from '../models/items';

@Injectable()
export class ItemsService {

  constructor(private store: Store<AppState>) {}

  getItems(): Observable<Items> {
    return this.store.select(appState => appState.items);
  }

  getItem(barcode: string): Observable<Item> {
    return this.store.select(appState => appState.items.results[barcode]);
  }

  getTempItem(): Observable<any> {
    return this.store.select(appState => appState.items.tempItem);
  }

  getTempItemCustomFields(): Observable<Array<ItemCustomField>> {
    return this.store.select(appState => appState.items.tempItemCustomFields);
  }

  getShouldShowLoadingSpinner(): Observable<boolean> {
    return this.store.select(appState => appState.items.showLoadingSpinner);
  }
}
