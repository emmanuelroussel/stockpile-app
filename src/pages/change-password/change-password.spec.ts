import { ComponentFixture, async, tick, fakeAsync } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Messages } from '../../constants';

import { ChangePasswordPage } from './change-password';

let fixture: ComponentFixture<ChangePasswordPage> = null;
let instance: any = null;

describe('ChangePassword Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ChangePasswordPage]).then(compiled => {
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

  it('calls userData.changePassword onSave()', fakeAsync(() => {
    instance.passwords.currentPassword = TestData.passwords.currentPassword;
    instance.passwords.newPassword = TestData.passwords.newPassword;
    instance.passwords.confirmPassword = TestData.passwords.confirmPassword;
    spyOn(instance.userData, 'changePassword').and.callThrough();
    spyOn(instance.notifications, 'showToast');
    spyOn(instance.navCtrl, 'pop');
    instance.onSave();
    tick();
    expect(instance.userData.changePassword).toHaveBeenCalledWith(TestData.passwords.currentPassword, TestData.passwords.newPassword);
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.response.message);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
  }));

  it('does not call userData.changePassword onSave() if passwords do not match', fakeAsync(() => {
    instance.passwords.newPassword = TestData.passwords.newPassword;
    instance.passwords.confirmPassword = 'no match';
    spyOn(instance.userData, 'changePassword').and.callThrough();
    spyOn(instance.notifications, 'showToast');
    instance.onSave();
    tick();
    expect(instance.userData.changePassword).not.toHaveBeenCalled();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.passwordsDontMatch);
  }));

  it('it shows toast if error onSave()', fakeAsync(() => {
    instance.userData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onSave();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));
});
