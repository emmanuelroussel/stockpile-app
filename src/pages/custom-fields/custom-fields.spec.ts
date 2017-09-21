import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { CustomFieldsPage } from './custom-fields';
import { EditCustomFieldPage } from '../edit-custom-field/edit-custom-field';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let fixture: ComponentFixture<CustomFieldsPage> = null;
let instance: any = null;

describe('Custom Fields Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([CustomFieldsPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('gets custom fields', () => {
    instance.ngOnInit();
    expect(instance.customFields).toEqual(Observable.of(TestData.customFields));
  });

  it('pushes EditCustomFieldPage on nav on viewCustomField()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onViewCustomField(TestData.customField.customFieldID);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditCustomFieldPage, {
      action: Actions.edit,
      customFieldID: TestData.customField.customFieldID
    });
  });

  it('pushes EditCustomFieldPage on nav on onAdd()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditCustomFieldPage, { action: Actions.add });
  });
});
