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

  const updateForm = (currentPassword: string, newPassword: string, confirmPassword: string) => {
    instance.passwordForm.controls['currentPassword'].setValue(currentPassword);
    instance.passwordForm.controls['newPassword'].setValue(newPassword);
    instance.passwordForm.controls['confirmPassword'].setValue(confirmPassword);
  }

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(
      TestData.passwords.currentPassword,
      TestData.passwords.newPassword,
      TestData.passwords.confirmPassword
    );
    expect(instance.passwordForm.value).toEqual(TestData.passwords);
  });

  it('validates currentPassword', () => {
    instance.ngOnInit();
    updateForm(
      '',
      TestData.passwords.newPassword,
      TestData.passwords.confirmPassword
    );
    expect(instance.passwordForm.controls.currentPassword.valid).toEqual(false);
    updateForm(
      TestData.passwords.currentPassword,
      TestData.passwords.newPassword,
      TestData.passwords.confirmPassword
    );
    expect(instance.passwordForm.controls.currentPassword.valid).toEqual(true);
  });

  it('validates newPassword', () => {
    instance.ngOnInit();
    updateForm(
      TestData.passwords.currentPassword,
      '',
      TestData.passwords.confirmPassword
    );
    expect(instance.passwordForm.controls.newPassword.valid).toEqual(false);
    updateForm(
      TestData.passwords.currentPassword,
      '123456',
      TestData.passwords.confirmPassword
    );
    expect(instance.passwordForm.controls.newPassword.valid).toEqual(false);
    updateForm(
      TestData.passwords.currentPassword,
      TestData.passwords.newPassword,
      TestData.passwords.confirmPassword
    );
    expect(instance.passwordForm.controls.newPassword.valid).toEqual(true);
  });

  it('validates confirmPassword', () => {
    instance.ngOnInit();
    updateForm(
      TestData.passwords.currentPassword,
      TestData.passwords.newPassword,
      ''
    );
    expect(instance.passwordForm.controls.confirmPassword.valid).toEqual(false);
    updateForm(
      TestData.passwords.currentPassword,
      TestData.passwords.newPassword,
      TestData.passwords.confirmPassword
    );
    expect(instance.passwordForm.controls.confirmPassword.valid).toEqual(true);
  });

  it('sets blur to true onSave()', () => {
    instance.passwordForm = { valid: false };
    instance.onSave();
    expect(instance.blur.currentPassword).toEqual(true);
    expect(instance.blur.newPassword).toEqual(true);
    expect(instance.blur.confirmPassword).toEqual(true);
  });

  it('dispatches action to change password', () => {
    instance.passwordForm = {
      value: {
        currentPassword: TestData.passwords.currentPassword,
        newPassword: TestData.passwords.newPassword,
        confirmPassword: TestData.passwords.confirmPassword
      },
      valid: true
    };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.userActions, 'changeUserPassword');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.savingPassword);
    expect(instance.userActions.changeUserPassword).toHaveBeenCalledWith({
      currentPassword: TestData.passwords.currentPassword,
      newPassword: TestData.passwords.newPassword,
    });
  });

  it('shows message and resets passwords if passwords don\'t match', () => {
    instance.passwordForm = {
      value: {
        currentPassword: TestData.passwords.currentPassword,
        newPassword: TestData.passwords.newPassword,
        confirmPassword: 'not matching'
      },
      valid: true,
      setValue: () => {}
    };
    spyOn(instance.notifications, 'showMessage');
    spyOn(instance.passwordForm, 'setValue');
    instance.onSave();
    expect(instance.notifications.showMessage).toHaveBeenCalledWith(Messages.passwordsDontMatch);
    expect(instance.passwordForm.setValue).toHaveBeenCalledWith({
      currentPassword: TestData.passwords.currentPassword,
      newPassword: '',
      confirmPassword: ''
    });
  });

  it('gets currentPassword', () => {
    instance.passwordForm = {
      get: (key: string) => TestData.passwords[key]
    };
    expect(instance.currentPassword).toEqual(TestData.passwords.currentPassword);
  });

  it('gets newPassword', () => {
    instance.passwordForm = {
      get: (key: string) => TestData.passwords[key]
    };
    expect(instance.newPassword).toEqual(TestData.passwords.newPassword);
  });

  it('gets confirmPassword', () => {
    instance.passwordForm = {
      get: (key: string) => TestData.passwords[key]
    };
    expect(instance.confirmPassword).toEqual(TestData.passwords.confirmPassword);
  });
});
