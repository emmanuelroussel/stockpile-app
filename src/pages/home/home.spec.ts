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

  it('pushes rental page on pushPage() with \'Rent\' if item is avaiable', fakeAsync(() => {
    instance.inventoryData.item = TestData.apiItem;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(TestData.apiItem.tag);
    tick();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { item: TestData.apiItem, action: Actions.rent });
  }));

  it('pushes rental page on pushPage() with \'Return\' if item is not available', fakeAsync(() => {
    instance.inventoryData.item = TestData.rentedApiItem;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(TestData.rentedApiItem.tag);
    tick();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { item: TestData.rentedApiItem, action: Actions.return });
  }));

  it('shows toast if error in pushPage()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.pushPage(TestData.item.tag);
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('calls barcodeScanner.scan() onScan()', fakeAsync(() => {
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance, 'pushPage');
    instance.onScan();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.pushPage).toHaveBeenCalledWith(TestData.barcodeData.text);
  }));

  it('does nothing if scan is cancelled', fakeAsync(() => {
    instance.barcodeScanner.cancel = true;
    spyOn(instance.notifications, 'showToast');
    spyOn(instance, 'pushPage');
    instance.onScan();
    tick();
    expect(instance.pushPage).not.toHaveBeenCalled();
    expect(instance.notifications.showToast).not.toHaveBeenCalled();
  }));

  it('shows toast if error in onScan()', fakeAsync(() => {
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onScan();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('creates an alert onType()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onType();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });
});
