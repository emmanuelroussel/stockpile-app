import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { KitModelsActions } from './kit-models.actions';

let instance: KitModelsActions = null;

describe('KitModels Actions', () => {

  beforeEach(() => {
    instance = new KitModelsActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchKitModels(TestData.kit.kitID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitModelsActions.FETCH, TestData.kit.kitID));
  });

  it('dispatches action CREATE_TEMP', () => {
    spyOn(instance.store, 'dispatch');
    instance.createTemp(TestData.kitModel);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitModelsActions.CREATE_TEMP, TestData.kitModel));
  });

  it('dispatches action UPDATE_TEMP', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateTemp(TestData.kitModel);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitModelsActions.UPDATE_TEMP, TestData.kitModel));
  });

  it('dispatches action DELETE_TEMP', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteTemp(TestData.kitModel.modelID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitModelsActions.DELETE_TEMP, TestData.kitModel.modelID));
  });

  it('dispatches action RESET_TEMP_KIT_MODELS', () => {
    spyOn(instance.store, 'dispatch');
    instance.resetTempKitModels();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(KitModelsActions.RESET_TEMP_KIT_MODELS));
  });
});
