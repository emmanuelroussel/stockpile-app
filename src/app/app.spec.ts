import { fakeAsync, tick } from '@angular/core/testing';
import { PlatformMock, UserDataMock, MenuMock, NavMock, SplashScreenMock, StatusBarMock, NotificationsMock } from '../mocks';
import { Events } from 'ionic-angular';
import { StockpileApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { TestData } from '../test-data';

let instance: any = null;

describe('Root Component', () => {

  beforeEach(() => {
    instance = new StockpileApp(
      (<any> new PlatformMock),
      (<any> new UserDataMock),
      (<any> new MenuMock),
      (<any> new SplashScreenMock),
      (<any> new StatusBarMock),
      (<any> new NotificationsMock),
      (<any> new Events)
    );
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
    instance.userData.user = TestData.user;
    instance.userData.organization = TestData.organization;
    spyOn(instance.userData, 'setUser');
    instance.ngOnInit();
    tick();
    expect(instance.rootPage).toEqual(TabsPage);
    expect(instance.userData.setUser).toHaveBeenCalled();
    expect(instance.user).toEqual(TestData.user);
    expect(instance.organization).toEqual(TestData.organization);
  }));

  it('gets user info when \'user:login\' event is published', fakeAsync(() => {
    instance.userData.user = TestData.user;
    instance.userData.organization = TestData.organization;
    instance.ngOnInit();
    instance.user = {};
    instance.organization = {};
    instance.events.publish('user:login');
    tick();
    expect(instance.user).toEqual(TestData.user);
    expect(instance.organization).toEqual(TestData.organization);
  }));

  it('updates user when \'user:edited\' event is published', () => {
    instance.ngOnInit();
    instance.user = {};
    instance.events.publish('user:edited', TestData.user);
    expect(instance.user).toEqual(TestData.user);
  });

  it('shows toast if error while getting user and organization', fakeAsync(() => {
    instance.userData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.getUserInfo();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledTimes(2);
  }));

  it('pushes EditAccountPage on editInfo()', () => {
    instance.user = TestData.user;
    spyOn(instance.menuCtrl, 'close');
    spyOn(instance.nav, 'push');
    instance.editInfo();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
    expect(instance.nav.push).toHaveBeenCalledWith(EditAccountPage, { user: TestData.user });
  });

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
