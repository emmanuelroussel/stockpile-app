import { fakeAsync, tick } from '@angular/core/testing';
import { PlatformMock, StockpileDataMock, UserDataMock } from '../mocks';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

let instance: any = null;

describe('Root Component', () => {

  beforeEach(() => {
    instance = new MyApp((<any> new PlatformMock), (<any> new StockpileDataMock), (<any> new UserDataMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('calls initHal(), isLoggedIn and platform.ready() in ngOnInit', fakeAsync(() => {
    spyOn(instance.stockpileData, 'initHal').and.callThrough();
    spyOn(instance.userData, 'isLoggedIn').and.callThrough();
    spyOn(instance.platform, 'ready').and.callThrough();
    instance.ngOnInit();
    tick();
    expect(instance.stockpileData.initHal).toHaveBeenCalled();
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
    instance.ngOnInit();
    tick();
    expect(instance.rootPage).toEqual(TabsPage);
  }));
});
