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
    instance.createModel(TestData.model.name, TestData.model.brandID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ModelsActions.CREATE, {
      name: TestData.model.name,
      brandID: TestData.model.brandID
    }));
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
