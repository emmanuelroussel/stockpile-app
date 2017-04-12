import { ComponentFixture, async, tick, fakeAsync } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Messages } from '../../constants';

import { EditAccountPage } from './edit-account';

let fixture: ComponentFixture<EditAccountPage> = null;
let instance: any = null;

describe('EditAccount Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([EditAccountPage]).then(compiled => {
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

  it('gets navParam user', () => {
    instance.navParams.param = TestData.user;
    instance.ngOnInit();
    expect(instance.user).toEqual(TestData.user);
  });

  it('calls userData.editUser onSave()', fakeAsync(() => {
    instance.user = TestData.user;
    spyOn(instance.userData, 'editUser').and.callThrough();
    spyOn(instance.notifications, 'showToast');
    spyOn(instance.events, 'publish');
    spyOn(instance.navCtrl, 'pop');
    instance.onSave();
    tick();
    expect(instance.userData.editUser).toHaveBeenCalledWith(TestData.user);
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.userEdited);
    expect(instance.events.publish).toHaveBeenCalledWith('user:edited', TestData.user);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
  }));

  it('it shows toast if error onSave()', fakeAsync(() => {
    instance.userData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onSave();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));
});
