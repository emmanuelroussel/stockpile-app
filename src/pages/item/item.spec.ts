import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { TestUtils } from '../../test';
import { ItemPage } from './item';
import { InventoryDataMock } from '../../mocks';

let fixture: ComponentFixture<ItemPage> = null;
let instance: any = null;

describe('Item Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ItemPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    instance.inventoryData = new InventoryDataMock();
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('gets navParam tag', () => {
    expect(instance.tag).toEqual('tag');
  });

  it('gets navParam action', () => {
    expect(instance.action).toEqual('action');
  });

  it('initializes with \'Good\' as condition default value', () => {
    expect(instance.item.condition).toEqual('Good');
  });

  it('calls onSave() on click on save button', () => {
    spyOn(instance, 'onSave');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onSave).toHaveBeenCalled();
  });

  it('pops nav onSave() if form is valid and action is add', fakeAsync(() => {
    instance.item.brand = 'Canon';
    instance.item.model = 'Rebel T5I';
    instance.item.category = 'Camera';
    instance.item.cost = '750';
    instance.item.condition = 'Good';
    instance.action = 'Add';
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
    instance.item.brand = 'Canon';
    instance.item.model = 'Rebel T5I';
    instance.item.category = 'Camera';
    instance.item.cost = '750';
    instance.item.condition = 'Good';
    instance.action = 'Edit';
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
    instance.action = 'Edit';
    spyOn(instance.navCtrl, 'pop');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onDelete();
      tick();
      expect(instance.navCtrl.pop).toHaveBeenCalled();
    });
  }));
});
