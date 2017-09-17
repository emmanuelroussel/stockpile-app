import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { LoadingMessages, subscribeUrl } from '../../constants';

import { LoginPage } from './login';

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

  const updateForm = (email: string, password: string) => {
    instance.loginForm.controls['email'].setValue(email);
    instance.loginForm.controls['password'].setValue(password);
  }

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(TestData.credentials.email, TestData.credentials.password);
    expect(instance.loginForm.value).toEqual(TestData.credentials);
  });

  it('validates email', () => {
    instance.ngOnInit();
    updateForm('', TestData.credentials.password);
    expect(instance.loginForm.controls.email.valid).toEqual(false);
    updateForm('not an email', TestData.credentials.password);
    expect(instance.loginForm.controls.email.valid).toEqual(false);
    updateForm(TestData.credentials.email, TestData.credentials.password);
    expect(instance.loginForm.controls.email.valid).toEqual(true);
  });

  it('validates password', () => {
    instance.ngOnInit();
    updateForm(TestData.credentials.email, '');
    expect(instance.loginForm.controls.password.valid).toEqual(false);
    updateForm(TestData.credentials.email, TestData.credentials.password);
    expect(instance.loginForm.controls.password.valid).toEqual(true);
  });

  it('sets blur to true onLogin()', () => {
    instance.loginForm = { valid: false };
    instance.onLogin();
    expect(instance.blur.email).toEqual(true);
    expect(instance.blur.password).toEqual(true);
  });

  it('logs user in onLogin()', () => {
    instance.loginForm = {
      value: TestData.credentials,
      valid: true
    };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.userActions, 'loginUser');
    instance.onLogin();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.loggingInUser);
    expect(instance.userActions.loginUser).toHaveBeenCalledWith(TestData.credentials);
  });

  it('it does not log user in onLogin() if the form is invalid', () => {
    instance.loginForm = { valid: false };
    spyOn(instance.userActions, 'loginUser');
    instance.onLogin();
    expect(instance.userActions.loginUser).not.toHaveBeenCalled();
  });

  it('navigates to subscribe url onSignup()', () => {
    spyOn(instance.browser, 'create');
    instance.onSignup();
    expect(instance.browser.create).toHaveBeenCalledWith(subscribeUrl);
  });

  it('gets email', () => {
    instance.loginForm = {
      get: (key: string) => TestData.credentials[key]
    };
    expect(instance.email).toEqual(TestData.credentials.email);
  });

  it('gets password', () => {
    instance.loginForm = {
      get: (key: string) => TestData.credentials[key]
    };
    expect(instance.password).toEqual(TestData.credentials.password);
  });
});
