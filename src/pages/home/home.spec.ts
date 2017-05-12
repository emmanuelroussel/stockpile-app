import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Actions } from '../../constants';
import { TestData } from '../../test-data';

import { HomePage } from './home';
import { RentalPage } from '../rental/rental';

let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;

describe('Home Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([HomePage]).then(compiled => {
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

  it('gets kits', fakeAsync(() => {
    instance.ngOnInit();
    tick();
    expect(instance.kits).toEqual(TestData.kits.results);
  }));

  it('shows toast if error while getting kits', fakeAsync(() => {
    instance.kitData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.ngOnInit();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes rental page on pushPage() with \'Rent\' if item is avaiable', fakeAsync(() => {
    instance.itemData.item = TestData.apiItem;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(TestData.apiItem.barcode);
    tick();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { item: TestData.apiItem, action: Actions.rent });
  }));

  it('pushes rental page on pushPage() with \'Return\' if item is not available', fakeAsync(() => {
    instance.itemData.item = TestData.rentedApiItem;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(TestData.rentedApiItem.barcode);
    tick();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { item: TestData.rentedApiItem, action: Actions.return });
  }));

  it('shows toast if error in pushPage()', fakeAsync(() => {
    instance.itemData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.pushPage(TestData.item.barcode);
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('calls barcodeScanner.scan() onScanBarcode()', fakeAsync(() => {
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance, 'pushPage');
    instance.onScanBarcode();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.pushPage).toHaveBeenCalledWith(TestData.barcodeData.text);
  }));

  it('does nothing if scan is cancelled', fakeAsync(() => {
    instance.barcodeScanner.cancel = true;
    spyOn(instance.notifications, 'showToast');
    spyOn(instance, 'pushPage');
    instance.onScanBarcode();
    tick();
    expect(instance.pushPage).not.toHaveBeenCalled();
    expect(instance.notifications.showToast).not.toHaveBeenCalled();
  }));

  it('shows toast if error in onScanBarcode()', fakeAsync(() => {
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onScanBarcode();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('creates an alert onTypeBarcode()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onTypeBarcode();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('creates an alert onRentKit()', () => {
    instance.kits = TestData.kits.results;
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onRentKit();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('creates an alert onRentKit() if there are no kits', () => {
    instance.kits = [];
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onRentKit();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });
});
