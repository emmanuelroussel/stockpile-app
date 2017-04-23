import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { ViewAccountPage } from './view-account';
import { EditAccountPage } from '../edit-account/edit-account';
import { ChangePasswordPage } from '../change-password/change-password';

let fixture: ComponentFixture<ViewAccountPage> = null;
let instance: any = null;

describe('ViewItem Page', () => {

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
});
