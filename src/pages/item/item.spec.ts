import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, ItemProperties } from '../../constants';
import { ViewMock, NavParamsMock } from '../../mocks';

import { ItemPage } from './item';
import { ItemFilterPage } from '../item-filter/item-filter';

let fixture: ComponentFixture<ItemPage> = null;
let instance: any = null;

describe('Item Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ItemPage]).then(compiled => {
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

  it('gets navParam tag', () => {
    instance.navParams.param = TestData.item.tag;
    instance.ngOnInit();
    expect(instance.item.tag).toEqual(TestData.item.tag);
  });

  it('gets navParam action', () => {
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    expect(instance.action).toEqual(Actions.edit);
  });

  it('gets item if action === \'Edit\'', fakeAsync(() => {
    instance.inventoryData.item = TestData.apiItem;
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    tick();
    expect(instance.item).toEqual(TestData.item);
    expect(instance.selectedBrand).toEqual(TestData.apiItem.brand);
    expect(instance.selectedModel).toEqual(TestData.apiItem.model);
    expect(instance.selectedCategory).toEqual(TestData.apiItem.category);
    expect(instance.selectedStatus).toEqual(TestData.apiItem.status);
  }));

  it('gets brands, models, statuses and categories', fakeAsync(() => {
    instance.inventoryData.brands = TestData.brands;
    instance.inventoryData.models = TestData.models;
    instance.inventoryData.statuses = TestData.statuses;
    instance.inventoryData.categories = TestData.categories;
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    tick();
    expect(instance.allBrands).toEqual(TestData.brands);
    expect(instance.allModels).toEqual(TestData.models);
    expect(instance.allStatuses).toEqual(TestData.statuses);
    expect(instance.allCategories).toEqual(TestData.categories);
  }));

  it('calls onSave() on click on save button', () => {
    spyOn(instance, 'onSave');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onSave).toHaveBeenCalled();
  });

  it('pops nav onSave() if form is valid and action is add', fakeAsync(() => {
    instance.item = TestData.item;
    instance.navParams.param = Actions.add;
    instance.ngOnInit();
    spyOn(instance.navCtrl, 'pop');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onSave(form);
      tick();
      expect(instance.navCtrl.pop).toHaveBeenCalled();
    });
  }));

  it('pops nav onSave() if form is valid and action is edit', fakeAsync(() => {
    instance.item = TestData.item;
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    spyOn(instance.navCtrl, 'pop');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onSave(form);
      tick();
      expect(instance.navCtrl.pop).toHaveBeenCalled();
    });
  }));

  it('pops nav onDelete()', fakeAsync(() => {
    instance.action = Actions.edit;
    spyOn(instance.navCtrl, 'pop');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onDelete();
      tick();
      expect(instance.navCtrl.pop).toHaveBeenCalled();
    });
  }));

  it('creates a modal on presentModal()', () => {
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.presentModal(null, TestData.brands, ItemProperties.brand);
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, { elements: TestData.brands, type: ItemProperties.brand });
  });
});
