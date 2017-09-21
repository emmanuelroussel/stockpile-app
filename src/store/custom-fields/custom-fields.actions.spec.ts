import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { CustomFieldsActions } from './custom-fields.actions';

let instance: CustomFieldsActions = null;

describe('CustomFields Actions', () => {

  beforeEach(() => {
    instance = new CustomFieldsActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchCustomFields();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CustomFieldsActions.FETCH));
  });

  it('dispatches action CREATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.createCustomField(TestData.customField);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CustomFieldsActions.CREATE, TestData.customField));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateCustomField(TestData.customField);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CustomFieldsActions.UPDATE, TestData.customField));
  });

  it('dispatches action DELETE', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteCustomField(TestData.customField.customFieldID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CustomFieldsActions.DELETE, TestData.customField.customFieldID));
  });
});
