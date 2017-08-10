import { StoreMock } from '../mocks';
import { BrandsService } from './brands.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';

let instance: BrandsService = null;

describe('Brands Service', () => {

  beforeEach(() => {
    instance = new BrandsService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns brands', () => {
    expect(instance.getBrands()).toEqual(Observable.of(TestData.state.brands));
  });

  it('returns showAddNew', () => {
    expect(instance.getShouldShowAddNew()).toEqual(Observable.of(TestData.state.brands.showAddNew));
  });
});
