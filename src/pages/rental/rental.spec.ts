import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Actions, Messages } from '../../constants';
import { TestData } from '../../test-data';

import { RentalPage } from './rental';
import { ItemPage } from '../item/item';

let fixture: ComponentFixture<RentalPage> = null;
let instance: any = null;

describe('Rental Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([RentalPage]).then(compiled => {
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

  it('gets navParam action', () => {
    instance.navParams.param = Actions.rent;
    instance.ngOnInit();
    expect(instance.action).toEqual(Actions.rent);
  });

  it('gets initial item info', fakeAsync(() => {
    instance.inventoryData.item = TestData.item;
    instance.ngOnInit();
    tick();
    expect(instance.items[0]).toEqual(TestData.item);
  }));

  it('calls onAdd() on click on add button', () => {
    spyOn(instance, 'onAdd');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onAdd).toHaveBeenCalled();
  });

  it('calls onScan() on click on add button', () => {
    spyOn(instance, 'onScan');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button')[3], 'click');
    expect(instance.onScan).toHaveBeenCalled();
  });

  it('calls viewItem() on click on an item', fakeAsync(() => {
    spyOn(instance, 'viewItem');
    instance.items.push(TestData.item);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button')[4], 'click');
      expect(instance.viewItem).toHaveBeenCalledWith(TestData.item);
    });
  }));

  it('pushes item onAdd()', fakeAsync(() => {
    instance.onAdd();
    tick();
    expect(instance.items).toEqual([TestData.apiItem]);
  }));

  it('shows toast if error onAdd()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.stockpileData, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.stockpileData.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes ItemPage on nav on viewItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.viewItem(TestData.item);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { tag: TestData.item.tag, action: Actions.edit });
  });

  it('pushes RentalDetailsPage on nav onContinue()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onContinue();
    expect(instance.navCtrl.push).toHaveBeenCalled();
  });

  it('calls inventoryData.return for each item', fakeAsync(() => {
    instance.items = TestData.items;
    spyOn(instance.inventoryData, 'return').and.callThrough();
    spyOn(instance.stockpileData, 'showToast');
    instance.onReturn();
    tick();
    expect(instance.inventoryData.return).toHaveBeenCalledTimes(TestData.items.length);
    expect(instance.stockpileData.showToast).toHaveBeenCalledWith(Messages.itemsReturned);
  }));

  it('shows toast if error onReturn()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    instance.items = TestData.items;
    spyOn(instance.stockpileData, 'showToast');
    instance.onReturn();
    tick();
    expect(instance.stockpileData.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('calls inventoryData.return() and pops nav onReturn()', fakeAsync(() => {
    instance.items.push(TestData.item);
    spyOn(instance.navCtrl, 'pop');
    spyOn(instance.inventoryData, 'return').and.callThrough();
    instance.onReturn();
    tick();
    expect(instance.navCtrl.pop).toHaveBeenCalled();
    expect(instance.inventoryData.return).toHaveBeenCalledWith(TestData.item.tag);
  }));

  it('calls stockpileData.scan() onScan()', fakeAsync(() => {
    spyOn(instance.stockpileData, 'scan').and.callThrough();
    spyOn(instance, 'onAdd');
    instance.onScan();
    tick();
    expect(instance.stockpileData.scan).toHaveBeenCalled();
    expect(instance.onAdd).toHaveBeenCalled();
    expect(instance.tag).toEqual(TestData.barcodeData.text);
  }));

  it('shows toast if error in onScan()', fakeAsync(() => {
    instance.stockpileData.resolve = false;
    spyOn(instance.stockpileData, 'showToast');
    instance.onScan();
    tick();
    expect(instance.stockpileData.showToast).toHaveBeenCalledWith(TestData.error);
  }));
});
