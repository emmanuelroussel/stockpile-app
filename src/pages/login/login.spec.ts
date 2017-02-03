import { ComponentFixture, async } from '@angular/core/testing';

import { TestUtils } from '../../test';
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

  it('changes root nav to TabsPage onLogin() if form is valid', () => {
    instance.login.email = 'me@me.com';
    instance.login.password = 'monkey';
    spyOn(instance.navCtrl, 'setRoot');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.navCtrl.setRoot).toHaveBeenCalledWith(TabsPage);
  });
});
