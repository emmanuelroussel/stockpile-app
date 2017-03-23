import { fakeAsync, tick } from '@angular/core/testing';
import { PlatformMock, StockpileDataMock, UserDataMock, MenuMock, NavMock } from '../mocks';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

let instance: any = null;

describe('Root Component', () => {

  beforeEach(() => {
    instance = new MyApp((<any> new PlatformMock), (<any> new StockpileDataMock), (<any> new UserDataMock), (<any> new MenuMock));
    instance.nav = (<any> new NavMock);
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('calls isLoggedIn and platform.ready() in ngOnInit', fakeAsync(() => {
    spyOn(instance.userData, 'isLoggedIn').and.callThrough();
    spyOn(instance.platform, 'ready').and.callThrough();
    instance.ngOnInit();
    tick();
    expect(instance.userData.isLoggedIn).toHaveBeenCalled();
    expect(instance.platform.ready).toHaveBeenCalled();
  }));

  it('sets LoginPage as a root page if user is not logged in', fakeAsync(() => {
    instance.userData.loggedIn = false;
    instance.ngOnInit();
    tick();
    expect(instance.rootPage).toEqual(LoginPage);
  }));

  it('sets TabsPage as a root page if user is logged in', fakeAsync(() => {
    instance.userData.loggedIn = true;
    spyOn(instance.userData, 'setUser');
    instance.ngOnInit();
    tick();
    expect(instance.rootPage).toEqual(TabsPage);
    expect(instance.userData.setUser).toHaveBeenCalled();
  }));

  it('calls logout(), closes side menu and sets nav root to LoginPage', () => {
    spyOn(instance.userData, 'logout');
    spyOn(instance.menuCtrl, 'close');
    spyOn(instance.nav, 'setRoot');
    instance.logout();
    expect(instance.userData.logout).toHaveBeenCalled();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
    expect(instance.nav.setRoot).toHaveBeenCalledWith(LoginPage);
  });
});
