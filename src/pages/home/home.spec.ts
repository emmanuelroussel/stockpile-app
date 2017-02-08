import { ComponentFixture, async } from '@angular/core/testing';

import { TestUtils } from '../../test';
import { ItemPage } from '../item/item';
import { HomePage } from './home';

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

  it('pushes item page onNext() with \'Add\'', async(() => {
    instance.segment = 'Add';
    instance.tag = 'banana';
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onNext();
      expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, {tag: 'banana', action: 'Add'});
    });
  }));

  it('pushes item page onNext() with \'Edit\'', async(() => {
    instance.segment = 'Edit';
    instance.tag = 'banana';
    spyOn(instance.navCtrl, 'push');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onNext();
      expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, {tag: 'banana', action: 'Edit'});
    });
  }));
});
