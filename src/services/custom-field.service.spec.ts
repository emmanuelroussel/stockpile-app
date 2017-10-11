import { StoreMock } from '../mocks';
import { CustomFieldsService } from './custom-fields.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: CustomFieldsService = null;

describe('CustomFields Service', () => {

  beforeEach(() => {
    instance = new CustomFieldsService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns custom fields', () => {
    expect(instance.getCustomFields()).toEqual(Observable.of(TestData.state.customFields));
  });

  it('returns custom field', () => {
    expect(instance.getCustomField(TestData.customField.customFieldID)).toEqual(
      Observable.of(TestData.state.customFields.results[TestData.customField.customFieldID])
    );
  });
});
