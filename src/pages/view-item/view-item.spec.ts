import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { ViewItemPage } from './view-item';
import { ItemPage } from '../item/item';

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

  it('gets item in ngOnInit', fakeAsync(() => {
    instance.inventoryData.item = TestData.apiItem;
    instance.ngOnInit();
    tick();
    expect(instance.item).toEqual(TestData.apiItem);
  }));

  it('shows toast if error while getting item', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.ngOnInit();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes ItemPage on nav onEdit()', fakeAsync(() => {
    instance.inventoryData.item = TestData.item;
    instance.ngOnInit();
    tick();
    spyOn(instance.navCtrl, 'push');
    instance.editItem();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { barcode: TestData.item.barcode, action: Actions.edit });
  }));
});
