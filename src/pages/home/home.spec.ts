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

  it('initializes with a segment of Rent', () => {
    expect(instance.segment).toEqual('Rent');
  });

  it('calls onNext() on click', () => {
    spyOn(instance, 'onNext');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onNext).toHaveBeenCalled();
  });

  it('calls onScan() on click', () => {
    spyOn(instance, 'onScan');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button')[4], 'click');
    expect(instance.onScan).toHaveBeenCalled();
  });

  it('calls pushPage onNext()', fakeAsync(() => {
    instance.tag = TestData.item.tag;
    instance.inventoryData.item = TestData.apiItem;
    spyOn(instance, 'pushPage');
    instance.onNext();
    tick();
    expect(instance.pushPage).toHaveBeenCalledWith(true);
  }));

  it('shows toast if error in onNext()', fakeAsync(() => {
    instance.tag = TestData.item.tag;
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onNext();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes rental page on pushPage() with \'Rent\'', fakeAsync(() => {
    instance.segment = Actions.rent;
    instance.tag = TestData.item.tag;
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.pushPage(true);
      expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { tag: TestData.item.tag, action: Actions.rent });
    });
  }));

  it('pushes rental page on pushPage() with \'Return\'', fakeAsync(() => {
    instance.segment = Actions.return;
    instance.tag = TestData.item.tag;
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.pushPage(false);
      expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { tag: TestData.item.tag, action: Actions.return });
    });
  }));

  it('does not change page if segment is rent and item is not available', () => {
    instance.segment = Actions.rent;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(false);
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  });

  it('does not change page if segment is return and item is available', () => {
    instance.segment = Actions.return;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(true);
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  });

  it('calls barcodeScanner.scan() onScan()', fakeAsync(() => {
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance, 'onNext');
    instance.onScan();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.onNext).toHaveBeenCalled();
    expect(instance.tag).toEqual(TestData.barcodeData.text);
  }));

  it('does nothing if scan is cancelled', fakeAsync(() => {
    instance.barcodeScanner.cancel = true;
    spyOn(instance.notifications, 'showToast');
    spyOn(instance, 'onNext');
    instance.onScan();
    tick();
    expect(instance.onNext).not.toHaveBeenCalled();
    expect(instance.notifications.showToast).not.toHaveBeenCalled();
    expect(instance.tag).toEqual('');
  }));

  it('shows toast if error in onScan()', fakeAsync(() => {
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onScan();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));
});
