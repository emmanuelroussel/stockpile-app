import { StoreMock } from '../mocks';
import { ItemsService } from './items.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';

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

  it('returns loadMoreItems', () => {
    expect(instance.getShouldLoadMoreItems()).toEqual(Observable.of(TestData.state.items.loadMoreItems));
  });

  it('returns showAddNew', () => {
    expect(instance.getShouldShowAddNew()).toEqual(Observable.of(TestData.state.items.showAddNew));
  });

  it('returns item', () => {
    expect(instance.getItem(TestData.barcode)).toEqual(Observable.of(TestData.state.items.results[TestData.barcode]));
  });

  it('returns temp item', () => {
    expect(instance.getTempItem()).toEqual(Observable.of(TestData.state.items.tempItem));
  });
});
