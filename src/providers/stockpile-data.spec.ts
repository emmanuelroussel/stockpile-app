import { StockpileData } from './stockpile-data';

let stockpileData: StockpileData = null;

describe('StockpileData Provider', () => {

  beforeEach(() => {
    stockpileData = new StockpileData();
  });

  it('is created', () => {
    expect(stockpileData).not.toBeNull();
  });
});
