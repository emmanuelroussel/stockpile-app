import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Messages, LoadingMessages } from '../../constants';

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

  it('dispatches action to change password', () => {
    const form = {
      value: {
        currentPassword: TestData.passwords.currentPassword,
        newPassword: TestData.passwords.newPassword,
        confirmPassword: TestData.passwords.confirmPassword
      }
    };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.userActions, 'changeUserPassword');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.savingPassword);
    expect(instance.userActions.changeUserPassword).toHaveBeenCalledWith({
      currentPassword: TestData.passwords.currentPassword,
      newPassword: TestData.passwords.newPassword,
    });
  });

  it('shows message and resets passwords if passwords don\'t match', () => {
    const form = {
      value: {
        currentPassword: TestData.passwords.currentPassword,
        newPassword: TestData.passwords.newPassword,
        confirmPassword: 'not matching'
      },
      setValue: () => {}
    };
    spyOn(instance.notifications, 'showMessage');
    spyOn(form, 'setValue');
    instance.onSave(form);
    expect(instance.notifications.showMessage).toHaveBeenCalledWith(Messages.passwordsDontMatch);
    expect(form.setValue).toHaveBeenCalledWith({
      currentPassword: TestData.passwords.currentPassword,
      newPassword: '',
      confirmPassword: ''
    });
  });
});
