import {
  MenuMock,
  NavMock,
  UserActionsMock,
  LoadingMock,
  OrganizationServiceMock,
  UserServiceMock,
  LayoutServiceMock
} from '../mocks';
import { StockpileApp } from './app.component';
import { ViewAccountPage } from '../pages/view-account/view-account';

let instance: any = null;

describe('Root Component', () => {

  beforeEach(() => {
    instance = new StockpileApp(
      (<any> new MenuMock),
      (<any> new OrganizationServiceMock),
      (<any> new LoadingMock),
      (<any> new UserServiceMock),
      (<any> new UserActionsMock),
      (<any> new LayoutServiceMock)
    );
    instance.nav = (<any> new NavMock);
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('checks if user is logged in', () => {
    spyOn(instance.userActions, 'checkUserLoggedIn');
    instance.ngOnInit();
    expect(instance.userActions.checkUserLoggedIn).toHaveBeenCalled();
  });

  it('pushes ViewAccountPage on viewInfo()', () => {
    spyOn(instance.menuCtrl, 'close');
    spyOn(instance.nav, 'push');
    instance.onViewInfo();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
    expect(instance.nav.push).toHaveBeenCalledWith(ViewAccountPage);
  });

  it('logs user out and closes side menu', () => {
    spyOn(instance.userActions, 'logoutUser');
    spyOn(instance.menuCtrl, 'close');
    instance.onLogout();
    expect(instance.userActions.logoutUser).toHaveBeenCalled();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
  });
});
