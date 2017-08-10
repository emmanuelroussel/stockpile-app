import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { LoadingMessages } from '../../constants';
import { TestData } from '../../test-data';

import { HomePage } from './home';
import { Observable } from 'rxjs/Observable';

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

  it('gets kits', () => {
    spyOn(instance.kitsActions, 'fetchKits');
    instance.ngOnInit();
    expect(instance.kitsActions.fetchKits).toHaveBeenCalled();
  });

  it('starts rental on pushPage()', () => {
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'startRental');
    instance.pushPage(TestData.apiItem.barcode);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.startingRental);
    expect(instance.itemsActions.startRental).toHaveBeenCalledWith(TestData.apiItem.barcode);
  });

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
    spyOn(instance.notifications, 'showMessage');
    spyOn(instance, 'pushPage');
    instance.onScanBarcode();
    tick();
    expect(instance.pushPage).not.toHaveBeenCalled();
    expect(instance.notifications.showMessage).not.toHaveBeenCalled();
  }));

  it('shows message if error in onScanBarcode()', fakeAsync(() => {
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showMessage');
    instance.onScanBarcode();
    tick();
    expect(instance.notifications.showMessage).toHaveBeenCalledWith(TestData.error);
  }));

  it('creates an alert onTypeBarcode()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onTypeBarcode();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('creates an alert onRentKit()', () => {
    instance.kits = Observable.of(TestData.kits);
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onRentKit();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('creates an alert onRentKit() if there are no kits', () => {
    instance.kits = Observable.of({ results: [] });
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onRentKit();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });
});
