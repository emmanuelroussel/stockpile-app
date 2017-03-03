import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Actions, Statuses } from '../../constants';
import { TestData } from '../../test-data';

import { HomePage } from './home';
import { ItemPage } from '../item/item';
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
    instance.inventoryData.status = TestData.status;
    spyOn(instance, 'pushPage');
    instance.onNext();
    tick();
    expect(instance.pushPage).toHaveBeenCalledWith(TestData.status.status);
  }));

  it('shows toast if error in onNext()', fakeAsync(() => {
    instance.tag = TestData.item.tag;
    instance.inventoryData.resolve = false;
    spyOn(instance.stockpileData, 'showToast');
    instance.onNext();
    tick();
    expect(instance.stockpileData.showToast).toHaveBeenCalledWith(TestData.error.message);
  }));

  it('pushes rental page on pushPage() with \'Rent\'', fakeAsync(() => {
    instance.segment = Actions.rent;
    instance.tag = TestData.item.tag;
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.pushPage(Statuses.available);
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
      instance.pushPage(Statuses.rented);
      expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { tag: TestData.item.tag, action: Actions.return });
    });
  }));

  it('pushes item page onNext() with \'Add\'', fakeAsync(() => {
    instance.segment = Actions.add;
    instance.tag = TestData.item.tag;
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onNext();
      expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { tag: TestData.item.tag, action: Actions.add });
    });
  }));

  it('pushes item page onNext() with \'Edit\'', fakeAsync(() => {
    instance.segment = Actions.edit;
    instance.tag = TestData.item.tag;
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.pushPage(Statuses.available);
      expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { tag: TestData.item.tag, action: Actions.edit });
    });
  }));

  it('does not change page if segment is rent and status is rented', () => {
    instance.segment = Actions.rent;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(Statuses.rented);
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  });

  it('does not change page if segment is return and status is available', () => {
    instance.segment = Actions.return;
    spyOn(instance.navCtrl, 'push');
    instance.pushPage(Statuses.available);
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  });
});
