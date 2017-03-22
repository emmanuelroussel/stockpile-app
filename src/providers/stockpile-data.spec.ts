import { PlatformMock } from '../mocks';

import { StockpileData } from './stockpile-data';

let stockpileData: StockpileData = null;

describe('StockpileData Provider', () => {

  beforeEach(() => {
    stockpileData = new StockpileData(<any> new PlatformMock);
  });

  it('is created', () => {
    expect(stockpileData).toBeTruthy();
  });
});
