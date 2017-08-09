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
});
