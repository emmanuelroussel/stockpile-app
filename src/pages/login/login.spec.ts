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

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('logs user in onLogin()', () => {
    const form = { value: TestData.credentials };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.userActions, 'loginUser');
    instance.onLogin(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.loggingInUser);
    expect(instance.userActions.loginUser).toHaveBeenCalledWith(form.value);
  });

  it('navigates to subscribe url onSignup()', () => {
    spyOn(instance.browser, 'create');
    instance.onSignup();
    expect(instance.browser.create).toHaveBeenCalledWith(subscribeUrl);
  });
});
