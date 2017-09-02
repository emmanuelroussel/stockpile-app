import { StoreMock } from '../mocks';
import { ItemsService } from './items.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: ItemsService = null;

describe('Items Service', () => {

  beforeEach(() => {
    instance = new ItemsService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns items', () => {
    expect(instance.getItems()).toEqual(Observable.of(TestData.state.items));
  });

  it('returns item', () => {
    expect(instance.getItem(TestData.barcode)).toEqual(Observable.of(TestData.state.items.results[TestData.barcode]));
  });

  it('returns temp item', () => {
    expect(instance.getTempItem()).toEqual(Observable.of(TestData.state.items.tempItem));
  });
});
