import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { ViewAccountPage } from './view-account';
import { EditAccountPage } from '../edit-account/edit-account';
import { ChangePasswordPage } from '../change-password/change-password';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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

  it('gets user', () => {
    instance.ngOnInit();
    expect(instance.user).toEqual(Observable.of(TestData.user));
  });

  it('pushes EditAccountPage on nav onEditUser()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onEditUser();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditAccountPage);
  });

  it('pushes ChangePasswordPage on nav onChangePassword()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onChangePassword();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ChangePasswordPage);
  });

  it('creates alerts on deleteAccount', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onDeleteAccount();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });
});
