import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { KitsActions } from './kits.actions';

let instance: KitsActions = null;

describe('Kits Actions', () => {

  beforeEach(() => {
    instance = new KitsActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchKits();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitsActions.FETCH));
  });

  it('dispatches action CREATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.createKit(TestData.kit, TestData.kitModels.results);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitsActions.CREATE, {
      kit: TestData.kit,
      kitModels: TestData.kitModels.results
    }));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateKit(TestData.kit, TestData.kitModels.results, TestData.deletedKitModels.results);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitsActions.UPDATE, {
      kit: TestData.kit,
      kitModelsToCreate: TestData.kitModels.results,
      kitModelsToDelete: TestData.deletedKitModels.results
    }));
  });

  it('dispatches action DELETE', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteKit(TestData.kit.kitID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitsActions.DELETE, TestData.kit.kitID));
  });
});
