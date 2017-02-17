import { ComponentFixture, async, fakeAsync } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Actions } from '../../constants';
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
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button')[3], 'click');
    expect(instance.onScan).toHaveBeenCalled();
  });

  it('pushes rental page onNext() with \'Rent\'', fakeAsync(() => {
    instance.segment = Actions.rent;
    instance.tag = TestData.item.tag;
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onNext();
      expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalPage, { tag: TestData.item.tag, action: Actions.rent });
    });
  }));

  it('pushes rental page onNext() with \'Return\'', fakeAsync(() => {
    instance.segment = Actions.return;
    instance.tag = TestData.item.tag;
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onNext();
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
      instance.onNext();
      expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { tag: TestData.item.tag, action: Actions.edit });
    });
  }));
});
