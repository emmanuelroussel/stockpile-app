import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, KitModel } from '../models';

@Injectable()
export class KitModelsService {

  constructor(private store: Store<AppState>) {}

  getKitModels(kitID: number): Observable<Array<KitModel>> {
    return this.store.select(appState => appState.kitModels.results[kitID]);
  }

  getShouldShowLoadingSpinner(): Observable<boolean> {
    return this.store.select(appState => appState.kitModels.showLoadingSpinner);
  }

  getTempKitModels(): Observable<Array<KitModel>> {
    return this.store.select(appState => appState.kitModels.tempKitModels);
  }
}
