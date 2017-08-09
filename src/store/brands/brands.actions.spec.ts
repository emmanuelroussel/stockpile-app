import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { BrandsActions } from './brands.actions';

let instance: BrandsActions = null;

describe('Brands Actions', () => {

  beforeEach(() => {
    instance = new BrandsActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchBrands();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(BrandsActions.FETCH));
  });

  it('dispatches action CREATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.createBrand(TestData.brand.name);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(BrandsActions.CREATE, { name: TestData.brand.name }));
  });

  it('dispatches action FILTER', () => {
    spyOn(instance.store, 'dispatch');
    instance.filterBrands(TestData.queryText);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(BrandsActions.FILTER, TestData.queryText));
  });
});
