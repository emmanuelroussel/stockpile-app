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
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('gets navParam tag', () => {
    instance.navParams.param = 'banana';
    instance.ngOnInit();
    expect(instance.tag).toEqual('banana');
  });

  it('gets navParam action', () => {
    instance.navParams.param = 'Edit';
    instance.ngOnInit();
    expect(instance.tag).toEqual('Edit');
  });

  it('initializes with \'Good\' as condition default value', () => {
    instance.ngOnInit();
    expect(instance.item.condition).toEqual('Good');
  });

  it('gets item if action === \'Edit\'', fakeAsync(() => {
    let item = { brand: 'Canon', model: 'Rebel T5i', category: 'Camera', cost: '750', condition: 'Good' };
    instance.inventoryData.item = item;
    instance.navParams.param = 'Edit';
    instance.ngOnInit();
    tick();
    expect(instance.item).toEqual(item);
  }));

  it('does not get item if action !== \'Edit\'', fakeAsync(() => {
    instance.navParams.param = 'Add';
    instance.ngOnInit();
    tick();
    expect(instance.item).toEqual({ condition: 'Good' });
  }));

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

    instance.navParams.param = 'Add';
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
    instance.item.brand = 'Canon';
    instance.item.model = 'Rebel T5I';
    instance.item.category = 'Camera';
    instance.item.cost = '750';
    instance.item.condition = 'Good';
    instance.navParams.param = 'Edit';
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
