import { fakeAsync, tick } from '@angular/core/testing';
import { NavigatorMock } from '../mocks';

import { StockpileData } from './stockpile-data';
import { ApiUrl } from '../constants';

let stockpileData: StockpileData = null;

describe('StockpileData Provider', () => {

  beforeEach(() => {
    stockpileData = new StockpileData(<any> new NavigatorMock);
  });

  it('is created', () => {
    expect(stockpileData).not.toBeNull();
  });

  it('gets a hal doc on init() and returns a promise', fakeAsync(() => {
    stockpileData.initHal().then(
      success => expect(true).toBeTruthy(),
      err => expect(false).toBeTruthy()
    );
    tick();
    expect(stockpileData.hal).toBeTruthy();
  }));
});
