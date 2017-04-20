import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { ViewItemPage } from './view-item';
import { EditItemPage } from '../edit-item/edit-item';

let fixture: ComponentFixture<ViewItemPage> = null;
let instance: any = null;

describe('ViewItem Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ViewItemPage]).then(compiled => {
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

  it('gets item in ngOnInit', () => {
    instance.navParams.param = TestData.apiItem;
    instance.ngOnInit();
    expect(instance.item).toEqual(TestData.apiItem);
  });

  it('pushes EditItemPage on nav onEdit()', () => {
    instance.item = TestData.item;
    spyOn(instance.navCtrl, 'push');
    instance.editItem();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditItemPage, { item: TestData.item, action: Actions.edit });
  });
});
