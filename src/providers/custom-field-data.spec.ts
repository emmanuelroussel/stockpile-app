import { CustomFieldData } from './custom-field-data';
import { TestData } from '../test-data';
import { ApiMock } from '../mocks';

let instance: CustomFieldData = null;

describe('CustomFieldData Provider', () => {

  beforeEach(() => {
    instance = new CustomFieldData((<any> new ApiMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('calls api to get a custom field', () => {
    instance.api.value = TestData.customField;
    instance.getCustomField(TestData.customField.customFieldID).subscribe(
      res => expect(res).toEqual(TestData.customField),
      err => fail(err)
    );
  });

  it('calls api to get custom fields', () => {
    instance.api.value = TestData.customFields;
    instance.getCustomFields().subscribe(
      res => expect(res).toEqual(TestData.customFields),
      err => fail(err)
    );
  });

  it('calls api to create custom field', () => {
    instance.api.value = TestData.response;
    instance.createCustomField(TestData.customField.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to update custom field', () => {
    instance.api.value = TestData.response;
    instance.updateCustomField(TestData.customField).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to delete custom field', () => {
    instance.api.value = TestData.response;
    instance.deleteCustomField(TestData.customField.customFieldID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to get categories', () => {
    instance.api.value = TestData.customFieldCategories;
    instance.getCategories(TestData.customField.customFieldID).subscribe(
      res => expect(res).toEqual(TestData.customFieldCategories),
      err => fail(err)
    );
  });

  it('calls api to update categories', () => {
    instance.api.value = TestData.response;
    instance.updateCategories(TestData.customField.customFieldID, TestData.customFieldCategories).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });
});
