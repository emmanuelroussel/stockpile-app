import { Injectable } from '@angular/core';
import { Navigator, HalDocument } from 'ng-hal';

@Injectable()
export class StockpileData {
  hal: HalDocument;

  constructor(public navigator: Navigator) { }

  initHal() {
    this.navigator
      .get('https://stockpile.adamvig.com/api')
      .subscribe((doc: HalDocument) => this.hal = doc);
  }
}
