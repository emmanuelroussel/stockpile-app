import { StoreMock } from '../mocks';
import { CustomFieldCategoriesService } from './custom-field-categories.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: CustomFieldCategoriesService = null;

describe('CustomFieldCategories Service', () => {

  beforeEach(() => {
    instance = new CustomFieldCategoriesService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns custom field categories', () => {
    expect(instance.getCustomFieldCategories(TestData.customField.customFieldID)).toEqual(
      Observable.of(TestData.state.customFieldCategories.results[TestData.customField.customFieldID])
    );
  });

  it('returns showLoadingSpinner', () => {
    expect(instance.getShouldShowLoadingSpinner()).toEqual(
      Observable.of(TestData.state.customFieldCategories.showLoadingSpinner)
    );
  });

  it('returns tempCustomFieldCategories', () => {
    expect(instance.getTempCustomFieldCategories()).toEqual(
      Observable.of(TestData.state.customFieldCategories.tempCustomFieldCategories)
    );
  });
});
