import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Actions, Messages } from '../../constants';
import { TestData } from '../../test-data';

import { RentalPage } from './rental';
import { ViewItemPage } from '../view-item/view-item';

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

  it('gets initial item info', () => {
    instance.navParams.param = TestData.item;
    instance.ngOnInit();
    expect(instance.items[0]).toEqual(TestData.item);
  });

  it('updates item when event is published', fakeAsync(() => {
    instance.inventoryData.item = TestData.modifiedItem;
    instance.ngOnInit();
    instance.items = TestData.items;
    instance.events.publish('item:edited', TestData.modifiedItem.barcode);
    tick();
    expect(instance.items).toEqual(TestData.modifiedItems);
  }));

  it('shows toast if error while updating item in event.subscribe', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    instance.ngOnInit();
    instance.items = TestData.items;
    spyOn(instance.notifications, 'showToast');
    instance.events.publish('item:edited', TestData.modifiedItem.barcode);
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes item onAdd()', fakeAsync(() => {
    instance.inventoryData.item = TestData.apiItem;
    instance.onAdd(TestData.apiItem.barcode);
    tick();
    expect(instance.items).toEqual([TestData.apiItem]);
  }));

  it('shows toast if error onAdd()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('shows toast if item is rented and wants to rent onAdd()', fakeAsync(() => {
    instance.inventoryData.item = TestData.rentedApiItem;
    instance.action = Actions.rent;
    spyOn(instance.notifications, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.itemAlreadyRented);
  }));

  it('shows toast if item is available and wants to return onAdd()', fakeAsync(() => {
    instance.inventoryData.item = TestData.apiItem;
    instance.action = Actions.return;
    spyOn(instance.notifications, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.itemNotRented);
  }));

  it('shows toast if item is already added', fakeAsync(() => {
    instance.items = TestData.items;
    instance.inventoryData.item = TestData.items[0];
    spyOn(instance.notifications, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.itemAlreadyAdded);
  }));

  it('pushes ItemPage on nav on viewItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.viewItem(TestData.item);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ViewItemPage, { barcode: TestData.item.barcode });
  });

  it('pushes RentalDetailsPage on nav onContinue()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onContinue();
    expect(instance.navCtrl.push).toHaveBeenCalled();
  });

  it('calls inventoryData.return for each item', fakeAsync(() => {
    instance.items = TestData.items;
    spyOn(instance.inventoryData, 'return').and.callThrough();
    spyOn(instance.notifications, 'showToast');
    instance.onReturn();
    tick();
    expect(instance.inventoryData.return).toHaveBeenCalledTimes(TestData.items.length);
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.itemsReturned);
  }));

  it('shows toast if error onReturn()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    instance.items = TestData.items;
    spyOn(instance.notifications, 'showToast');
    instance.onReturn();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('calls inventoryData.return() and pops nav onReturn()', fakeAsync(() => {
    instance.items.push(TestData.item);
    spyOn(instance.navCtrl, 'pop');
    spyOn(instance.inventoryData, 'return').and.callThrough();
    instance.onReturn();
    tick();
    expect(instance.navCtrl.pop).toHaveBeenCalled();
    expect(instance.inventoryData.return).toHaveBeenCalledWith(TestData.item.barcode);
  }));

  it('calls barcodeScanner.scan() onScanBarcode()', fakeAsync(() => {
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance, 'onAdd');
    instance.onScanBarcode();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.onAdd).toHaveBeenCalledWith(TestData.barcodeData.text);
  }));

  it('shows toast if error in onScanBarcode()', fakeAsync(() => {
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onScanBarcode();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('it does nothing if scan is cancelled', fakeAsync(() => {
    instance.barcodeScanner.cancel = true;
    spyOn(instance.notifications, 'showToast');
    spyOn(instance, 'onAdd');
    instance.onScanBarcode();
    tick();
    expect(instance.onAdd).not.toHaveBeenCalled();
    expect(instance.notifications.showToast).not.toHaveBeenCalled();
  }));

  it('creates an alert onTypeBarcode()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onTypeBarcode();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('removes item from the list onRemoveItem()', () => {
    instance.items = TestData.items;
    instance.onRemoveItem(TestData.barcode);
    expect(instance.items).toEqual(TestData.itemsMinusOne);
  });
});
