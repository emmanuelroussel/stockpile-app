import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { ModelsActions } from './models.actions';

let instance: ModelsActions = null;

describe('Models Actions', () => {

  beforeEach(() => {
    instance = new ModelsActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchModels();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ModelsActions.FETCH));
  });

  it('dispatches action CREATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.createModel(TestData.model.name, TestData.model.brandID, TestData.pop);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ModelsActions.CREATE, {
      model: {
        name: TestData.model.name,
        brandID: TestData.model.brandID
      },
      pop: TestData.pop
    }));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateModel(TestData.model);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ModelsActions.UPDATE, TestData.model));
  });

  it('dispatches action DELETE', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteModel(TestData.model.modelID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ModelsActions.DELETE, TestData.model.modelID));
  });

  it('dispatches action FILTER', () => {
    spyOn(instance.store, 'dispatch');
    instance.filterModels(TestData.model.brandID, TestData.queryText);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ModelsActions.FILTER, {
      brandID: TestData.model.brandID,
      text: TestData.queryText
    }));
  });
});
