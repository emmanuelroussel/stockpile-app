import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Actions, Messages } from '../../constants';
import { TestData } from '../../test-data';

import { KitRentalPage } from './kit-rental';
import { ViewItemPage } from '../view-item/view-item';

let fixture: ComponentFixture<KitRentalPage> = null;
let instance: any = null;

describe('KitRental Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([KitRentalPage]).then(compiled => {
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

  it('gets kit and kitItems', fakeAsync(() => {
    instance.navParams.param = TestData.kit.kitID;
    instance.kitData.kitItems = TestData.kitItems;
    spyOn(instance.kitData, 'getKit').and.callThrough();
    spyOn(instance.kitData, 'getKitItems').and.callThrough();
    instance.ngOnInit();
    tick();
    expect(instance.kitData.getKit).toHaveBeenCalledWith(TestData.kit.kitID);
    expect(instance.kitData.getKitItems).toHaveBeenCalledWith(TestData.kit.kitID);
    expect(instance.kit).toEqual(TestData.kit);
    expect(instance.kitItems).toEqual(TestData.kitItems.results);
  }));

  it('shows toast if error while getting kit and kitItems', fakeAsync(() => {
    instance.kitData.resolve = false;
    instance.navParams.param = TestData.kit.kitID;
    spyOn(instance.notifications, 'showToast');
    instance.ngOnInit();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledTimes(2);
  }));

  it('shows toast if error onAdd()', fakeAsync(() => {
    instance.itemData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('shows toast if item is rented', fakeAsync(() => {
    instance.itemData.item = TestData.rentedApiItem;
    spyOn(instance.notifications, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.itemAlreadyRented);
  }));

  it('shows toast if item is already added', fakeAsync(() => {
    instance.items = TestData.items;
    instance.itemData.item = TestData.items[0];
    spyOn(instance.notifications, 'showToast');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.itemAlreadyAdded);
  }));

  it('creates alert if item is not in kitItems', fakeAsync(() => {
    instance.kitItems = JSON.parse(JSON.stringify(TestData.kitItems.results));
    instance.itemData.item = TestData.apiItem;
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onAdd();
    tick();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  }));

  it('creates an alert onTypeBarcode()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onTypeBarcode();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

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

  it('pushes RentalDetailsPage on nav onContinue()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onContinue();
    expect(instance.navCtrl.push).toHaveBeenCalled();
  });

  it('shows alert if not all kitItems are scanned onContinue()', () => {
    instance.kitItems = TestData.kitItemsWithBarcode.results;
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onContinue();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('removes kit item from the list onRemoveKitItem()', () => {
    instance.items = JSON.parse(JSON.stringify(TestData.items));
    instance.kitItems = TestData.kitItemsWithBarcode.results;
    instance.onRemoveKitItem(TestData.barcode);
    expect(instance.items).toEqual(TestData.itemsMinusOne);
    expect(instance.kitItems).toEqual(TestData.kitItemsWithEmptyBarcode.results);
  });

  it('removes item from the list onRemoveOtherItem()', () => {
    instance.items = JSON.parse(JSON.stringify(TestData.items));
    instance.otherItems = JSON.parse(JSON.stringify(TestData.items));
    instance.onRemoveOtherItem(TestData.barcode);
    expect(instance.items).toEqual(TestData.itemsMinusOne);
    expect(instance.otherItems).toEqual(TestData.itemsMinusOne);
  });
});
