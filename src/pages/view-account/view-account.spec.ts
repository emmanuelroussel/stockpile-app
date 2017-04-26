import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { ViewAccountPage } from './view-account';
import { EditAccountPage } from '../edit-account/edit-account';
import { ChangePasswordPage } from '../change-password/change-password';
import { Messages } from '../../constants';
import { LoginPage } from '../login/login';

let fixture: ComponentFixture<ViewAccountPage> = null;
let instance: any = null;

describe('ViewAccount Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ViewAccountPage]).then(compiled => {
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

  it('gets user in ngOnInit', () => {
    instance.navParams.param = TestData.user;
    instance.ngOnInit();
    expect(instance.user).toEqual(TestData.user);
  });

  it('updates user when \'user:edited\' event is published', () => {
    instance.ngOnInit();
    instance.user = {};
    instance.events.publish('user:edited', TestData.user);
    expect(instance.user).toEqual(TestData.user);
  });

  it('pushes EditAccountPage on nav onEdit()', () => {
    instance.user = TestData.user;
    spyOn(instance.navCtrl, 'push');
    instance.editUser();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditAccountPage, { user: TestData.user });
  });

  it('pushes ChangePasswordPage on nav changePassword()', () => {
    instance.user = TestData.user;
    spyOn(instance.navCtrl, 'push');
    instance.changePassword();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ChangePasswordPage);
  });

  it('creates alerts on deleteAccount', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.deleteAccount();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('archives a user in archiveUser()', fakeAsync(() => {
    const body = {
      archived: new Date().toISOString().substring(0, 10)
    };
    spyOn(instance.userData, 'editUser').and.callThrough();
    spyOn(instance.notifications, 'showToast');
    spyOn(instance.userData, 'logout');
    spyOn(instance.navCtrl, 'setRoot');
    instance.archiveUser();
    tick();
    expect(instance.userData.editUser).toHaveBeenCalledWith(body);
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.userDeleted);
    expect(instance.userData.logout).toHaveBeenCalled();
    expect(instance.navCtrl.setRoot).toHaveBeenCalledWith(LoginPage);
  }));

  it('shows toast if error in archiveUser()', fakeAsync(() => {
    instance.userData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    spyOn(instance.navCtrl, 'setRoot');
    instance.archiveUser();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
    expect(instance.navCtrl.setRoot).not.toHaveBeenCalled();
  }));
});
