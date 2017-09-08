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
    instance.createBrand(TestData.brand.name, TestData.pop);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(BrandsActions.CREATE, {
      name: TestData.brand.name,
      pop: TestData.pop
    }));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateBrand(TestData.brand);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(BrandsActions.UPDATE, TestData.brand));
  });

  it('dispatches action DELETE', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteBrand(TestData.brand.brandID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(BrandsActions.DELETE, TestData.brand.brandID));
  });

  it('dispatches action FILTER', () => {
    spyOn(instance.store, 'dispatch');
    instance.filterBrands(TestData.queryText);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(BrandsActions.FILTER, TestData.queryText));
  });
});
