import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, ItemProperties } from '../../constants';

import { ViewFieldPage } from './view-field';
import { EditFieldPage } from '../edit-field/edit-field';

let fixture: ComponentFixture<ViewFieldPage> = null;
let instance: any = null;

describe('ViewField Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ViewFieldPage]).then(compiled => {
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

  it('gets field', () => {
    instance.navParams.param = TestData.brand;
    instance.ngOnInit();
    expect(instance.field).toEqual(TestData.brand);
  });

  it('pushes EditFieldPage on nav onEdit()', () => {
    instance.field = TestData.brand;
    instance.type = ItemProperties.brand;
    spyOn(instance.navCtrl, 'push');
    instance.onEditField();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditFieldPage, {
      action: Actions.edit,
      type: ItemProperties.brand,
      field: TestData.brand,
    });
  });
});
