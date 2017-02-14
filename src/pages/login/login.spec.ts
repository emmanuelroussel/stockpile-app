import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { TestUtils } from '../../test';
import { UserDataMock } from '../../mocks';

import { LoginPage } from './login';
import { TabsPage } from '../tabs/tabs';

let fixture: ComponentFixture<LoginPage> = null;
let instance: any = null;

describe('Login Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    instance.userData = new UserDataMock();
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('calls onLogin() on click', () => {
    spyOn(instance, 'onLogin');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onLogin).toHaveBeenCalled();
  });

  it('changes root nav to TabsPage onLogin() if form is valid', fakeAsync(() => {
    instance.login.email = 'me@me.com';
    instance.login.password = 'monkey';
    spyOn(instance.navCtrl, 'setRoot');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onLogin(form);
      tick();
      expect(instance.navCtrl.setRoot).toHaveBeenCalledWith(TabsPage);
    });
  }));

  it('disables login button initially', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(true);
    });
  }));

  it('keeps login button disabled of form is not valid', async(() => {
    instance.login.email = 'invalid email';
    instance.login.password = 'monkey';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(true);
    });

    instance.login.email = 'hello@me.com';
    instance.login.password = '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(true);
    });
  }));

  it('enables login button if form is valid', async(() => {
    instance.login.email = 'hello@me.com';
    instance.login.password = 'monkey';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(false);
    });
  }));
});
