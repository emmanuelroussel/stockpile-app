import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, LoadingMessages, ItemProperties } from '../../constants';

import { EditCustomFieldPage } from './edit-custom-field';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let fixture: ComponentFixture<EditCustomFieldPage> = null;
let instance: any = null;

describe('EditCustomField Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([EditCustomFieldPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  const updateForm = (name: string) => {
    instance.customFieldForm.controls['name'].setValue(name);
  }

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('gets navParam action', () => {
    instance.navParams.param = Actions.add;
    instance.ngOnInit();
    expect(instance.action).toEqual(Actions.add);
  });

  it('fetches categories if action is edit', () => {
    instance.navParams.param = Actions.edit;
    spyOn(instance.customFieldCategoriesActions, 'fetchCustomFieldCategories');
    instance.ngOnInit();
    expect(instance.customFieldCategoriesActions.fetchCustomFieldCategories).toHaveBeenCalled();
  });

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(TestData.customField.name);
    expect(instance.customFieldForm.value).toEqual({ name: TestData.customField.name });
  });

  it('validates name', () => {
    instance.ngOnInit();
    updateForm('');
    expect(instance.customFieldForm.controls.name.valid).toEqual(false);
    updateForm(TestData.customField.name);
    expect(instance.customFieldForm.controls.name.valid).toEqual(true);
  });

  it('sets blur to true onSave()', () => {
    instance.customFieldForm = { valid: false };
    instance.onSave();
    expect(instance.blur.name).toEqual(true);
  });

  it('creates custom field onSave() if action is add', () => {
    instance.customFieldForm = {
      value: { name: TestData.customField.name },
      valid: true
    };
    instance.action = Actions.add;
    instance.customFieldCategories = Observable.of([TestData.customFieldCategory]);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.customFieldsActions, 'createCustomField');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingCustomField);
    expect(instance.customFieldsActions.createCustomField).toHaveBeenCalledWith({ name: TestData.customField.name });
  });

  it('updates custom field onSave() if action is edit', () => {
    instance.customFieldForm = {
      value: { name: TestData.customField.name },
      valid: true
    };
    instance.action = Actions.edit;
    instance.customField = Observable.of(TestData.customField);
    instance.customFieldCategories = Observable.of([TestData.customFieldCategory]);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.customFieldsActions, 'updateCustomField');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingCustomField);
    expect(instance.customFieldsActions.updateCustomField).toHaveBeenCalledWith({
      name: TestData.customField.name,
      customFieldID: TestData.customField.customFieldID
    });
  });

  it('it does not save custom field onSave() if the form is invalid', () => {
    instance.customFieldForm = { valid: false };
    spyOn(instance.customFieldsActions, 'updateCustomField');
    spyOn(instance.customFieldsActions, 'createCustomField');
    instance.onSave();
    expect(instance.customFieldsActions.updateCustomField).not.toHaveBeenCalled();
    expect(instance.customFieldsActions.createCustomField).not.toHaveBeenCalled();
  });

  it('creates an alert onDelete()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onDelete();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('deletes custom field on deleteCustomField()', () => {
    instance.customField = Observable.of(TestData.customField);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.customFieldsActions, 'deleteCustomField');
    instance.deleteCustomField();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingCustomField);
    expect(instance.customFieldsActions.deleteCustomField).toHaveBeenCalledWith(TestData.customField.customFieldID);
  });

  it('resets tempCustomFieldCategories onSelectAll()', () => {
    spyOn(instance.customFieldCategoriesActions, 'resetTempCustomFieldCategories');
    instance.onSelectAll();
    expect(instance.customFieldCategoriesActions.resetTempCustomFieldCategories).toHaveBeenCalled();
  });

  it('creates an alert onModifyCategories()', () => {
    instance.categories = Observable.of({
      results: { [TestData.category.categoryID]: TestData.category }
    });
    instance.customFieldCategories = Observable.of(TestData.customFieldCategories.results);
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onModifyCategories();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('creates an alert onModifyCategories() if there are no categories', () => {
    instance.categories = Observable.of({ results: {} });
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onModifyCategories();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('gets name', () => {
    instance.customFieldForm = {
      get: (key: string) => TestData.customField[key]
    };
    expect(instance.name).toEqual(TestData.customField.name);
  });
});
