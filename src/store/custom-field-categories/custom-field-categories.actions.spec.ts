import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { CustomFieldCategoriesActions } from './custom-field-categories.actions';

let instance: CustomFieldCategoriesActions = null;

describe('CustomFieldCategories Actions', () => {

  beforeEach(() => {
    instance = new CustomFieldCategoriesActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchCustomFieldCategories(TestData.customField.customFieldID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(
      createAction(CustomFieldCategoriesActions.FETCH, TestData.customField.customFieldID)
    );
  });

  it('dispatches action UPDATE_TEMP', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateTemp(TestData.customFieldCategories.results);
    expect(instance.store.dispatch).toHaveBeenCalledWith(
      createAction(CustomFieldCategoriesActions.UPDATE_TEMP, TestData.customFieldCategories.results)
    );
  });

  it('dispatches action RESET_TEMP_CUSTOM_FIELD_CATEGORIES', () => {
    spyOn(instance.store, 'dispatch');
    instance.resetTempCustomFieldCategories();
    expect(instance.store.dispatch).toHaveBeenCalledWith(
      createAction(CustomFieldCategoriesActions.RESET_TEMP_CUSTOM_FIELD_CATEGORIES)
    );
  });
});
