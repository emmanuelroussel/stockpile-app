import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { ItemProperties, Actions } from '../../constants';

import { FieldsPage } from './fields';
import { EditFieldPage } from '../edit-field/edit-field';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<FieldsPage> = null;
let instance: any = null;

describe('Fields Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([FieldsPage]).then(compiled => {
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

  it('gets navParam field', () => {
    instance.navParams.param = Observable.of(TestData.brands);
    instance.ngOnInit();
    expect(instance.fields).toEqual(Observable.of(TestData.brands));
  });

  it('gets navParam type', () => {
    instance.navParams.param = ItemProperties.brand;
    instance.ngOnInit();
    expect(instance.type).toEqual(ItemProperties.brand);
  });

  it('gets navParam typePlural', () => {
    instance.navParams.param = ItemProperties.brandPlural;
    instance.ngOnInit();
    expect(instance.typePlural).toEqual(ItemProperties.brandPlural);
  });

  it('pushes EditFieldPage on nav on viewField()', () => {
    instance.type = ItemProperties.brand;
    spyOn(instance.navCtrl, 'push');
    instance.onViewField(TestData.brand);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditFieldPage, {
      action: Actions.edit,
      type: ItemProperties.brand,
      field: TestData.brand,
    });
  });

  it('pushes EditKitPage on nav on add()', () => {
    instance.type = ItemProperties.brand;
    spyOn(instance.navCtrl, 'push');
    instance.onAdd(TestData.brand);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditFieldPage, {
      action: Actions.add,
      type: ItemProperties.brand,
    });
  });
});
