import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { LoginPage } from './login';
import { TabsPage } from '../tabs/tabs';

let fixture: ComponentFixture<LoginPage> = null;
let instance: any = null;

describe('Login Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
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

  it('calls onLogin() on click', () => {
    spyOn(instance, 'onLogin');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onLogin).toHaveBeenCalled();
  });

  it('changes root nav to TabsPage onLogin() if form is valid', fakeAsync(() => {
    instance.login.email = TestData.credentials.email;
    instance.login.password = TestData.credentials.password;
    instance.userData.resolve = true;
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

  it('resets password and shows toast if error', fakeAsync(() => {
    instance.login.email = TestData.credentials.email;
    instance.login.password = TestData.credentials.password;
    instance.userData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onLogin(form);
      tick();
      expect(instance.login.password).toEqual('');
      expect(instance.notifications.showToast).toHaveBeenCalled();
    });
  }));

  it('disables login button initially', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(true);
    });
  }));

  it('keeps login button disabled of form is not valid', fakeAsync(() => {
    instance.login.email = 'invalid email';
    instance.login.password = TestData.credentials.password;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(true);
    });

    instance.login.email = TestData.credentials.email;
    instance.login.password = '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(true);
    });
  }));

  it('enables login button if form is valid', fakeAsync(() => {
    instance.login.email = TestData.credentials.email;
    instance.login.password = TestData.credentials.password;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0].disabled).toBe(false);
    });
  }));
});
