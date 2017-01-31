import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { NavMock } from '../../mocks';
import { LoginPage } from './login';
import { TabsPage } from '../tabs/tabs'

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

  it('sets root nav to TabsPage when login() is called', () => {
    spyOn(instance, 'login');
    instance.login();

    fixture.detectChanges();
    expect(instance.login).toHaveBeenCalled();
  });
});
