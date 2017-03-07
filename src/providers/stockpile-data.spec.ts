import { fakeAsync, tick } from '@angular/core/testing';
import { NavigatorMock, PlatformMock } from '../mocks';

import { StockpileData } from './stockpile-data';

let stockpileData: StockpileData = null;

describe('StockpileData Provider', () => {

  beforeEach(() => {
    stockpileData = new StockpileData(<any> new NavigatorMock, <any> new PlatformMock);
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
