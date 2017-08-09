import { MapToIterablePipe } from './map-to-iterable.pipe';
import { TestData } from '../test-data';

describe('MapToIterable Pipe', () => {
  let instance: MapToIterablePipe = null;

  beforeEach(() => {
    instance = new MapToIterablePipe();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('transforms a map into an array', () => {
    expect(instance.transform(TestData.itemsMap)).toEqual(TestData.items);
  });

  it('returns null if map is undefined', () => {
    expect(instance.transform(undefined)).toEqual(null);
  });
});
