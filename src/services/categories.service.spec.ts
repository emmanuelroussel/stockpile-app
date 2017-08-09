import { StoreMock } from '../mocks';
import { CategoriesService } from './categories.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';

let instance: CategoriesService = null;

describe('Categories Service', () => {

  beforeEach(() => {
    instance = new CategoriesService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns categories', () => {
    expect(instance.getCategories()).toEqual(Observable.of(TestData.state.categories));
  });

  it('returns showAddNew', () => {
    expect(instance.getShouldShowAddNew()).toEqual(Observable.of(TestData.state.categories.showAddNew));
  });
});
