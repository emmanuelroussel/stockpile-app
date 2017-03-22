import { PlatformMock, PlatformMockIsCore } from '../mocks';

import { StockpileData } from './stockpile-data';
import { TestData } from '../test-data';

let stockpileData: StockpileData = null;

describe('StockpileData Provider', () => {

  beforeEach(() => {
    stockpileData = new StockpileData(<any> new PlatformMock);
  });

  it('is created', () => {
    expect(stockpileData).toBeTruthy();
  });

  it('logs message to the console if cordova is not available', () => {
    stockpileData = new StockpileData(<any> new PlatformMockIsCore);
    spyOn(console, 'log');
    stockpileData.showToast(TestData.response.message);
    expect(console.log).toHaveBeenCalledWith(TestData.response.message);
  });
});
