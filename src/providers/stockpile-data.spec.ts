import { fakeAsync, tick } from '@angular/core/testing';
import { StockpileData } from './stockpile-data';
import { NavigatorMock } from '../mocks';

let stockpileData: StockpileData = null;

describe('StockpileData Provider', () => {

  beforeEach(() => {
    stockpileData = new StockpileData(<any> new NavigatorMock);
  });

  it('is created', () => {
    expect(stockpileData).not.toBeNull();
  });

  it('gets a hal doc on init()', fakeAsync(() => {
    stockpileData.initHal();
    tick();
    expect(stockpileData.hal).toBeTruthy();
  }));
});
