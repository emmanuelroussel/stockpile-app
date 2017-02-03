import { PlatformMock } from '../mocks';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

let instance: any = null;

describe('Root Component', () => {

  beforeEach(() => {
    instance = new MyApp((<any> new PlatformMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('initialises with a root page of LoginPage', () => {
    expect(instance['rootPage']).toBe(LoginPage);
  });
});
