import { Injectable } from '@angular/core';
import { Navigator, HalDocument } from 'ng-hal';

@Injectable()
export class StockpileData {
  hal: HalDocument;

  constructor(private navigator: Navigator) { }

  initHal() {
    this.navigator
      .get('https://stockpile.adamvig.com/api')
      .subscribe((doc: HalDocument) => console.log(doc));
  }
}
