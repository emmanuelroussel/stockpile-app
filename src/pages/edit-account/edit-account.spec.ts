import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { LoadingMessages } from '../../constants';

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

  it('gets user', () => {
    instance.ngOnInit();
    instance.user.take(1).subscribe(user => expect(user).toEqual(TestData.user));
  });

  it('dispatches action to update account', () => {
    const form = {
      value: TestData.user
    };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.userActions, 'updateUser');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingUser);
    expect(instance.userActions.updateUser).toHaveBeenCalledWith(TestData.user);
  });
});
