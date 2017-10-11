import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { ExternalRentersActions } from './external-renters.actions';

let instance: ExternalRentersActions = null;

describe('ExternalRenters Actions', () => {

  beforeEach(() => {
    instance = new ExternalRentersActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchExternalRenters();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ExternalRentersActions.FETCH));
  });

  it('dispatches action CREATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.createExternalRenter(TestData.externalRenter, TestData.pop);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ExternalRentersActions.CREATE, {
      externalRenter: TestData.externalRenter,
      pop: TestData.pop
    }));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateExternalRenter(TestData.externalRenter);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ExternalRentersActions.UPDATE, TestData.externalRenter));
  });

  it('dispatches action DELETE', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteExternalRenter(TestData.externalRenter.externalRenterID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ExternalRentersActions.DELETE, TestData.externalRenter.externalRenterID));
  });

  it('dispatches action FILTER', () => {
    spyOn(instance.store, 'dispatch');
    instance.filterExternalRenters(TestData.queryText);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ExternalRentersActions.FILTER, TestData.queryText));
  });
});
