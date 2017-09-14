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

  const updateForm = (firstName: string, lastName: string, email: string) => {
    instance.userForm.controls['firstName'].setValue(firstName);
    instance.userForm.controls['lastName'].setValue(lastName);
    instance.userForm.controls['email'].setValue(email);
  }

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('gets user', () => {
    instance.ngOnInit();
    instance.user.take(1).subscribe(user => expect(user).toEqual(TestData.user));
  });

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(
      TestData.user.firstName,
      TestData.user.lastName,
      TestData.user.email
    );
    expect(instance.userForm.value).toEqual({
      firstName: TestData.user.firstName,
      lastName: TestData.user.lastName,
      email: TestData.user.email
    });
  });

  it('validates firstName', () => {
    instance.ngOnInit();
    updateForm(
      '',
      TestData.user.lastName,
      TestData.user.email
    );
    expect(instance.firstName.valid).toEqual(false);
    updateForm(
      TestData.user.firstName,
      TestData.user.lastName,
      TestData.user.email
    );
    expect(instance.firstName.valid).toEqual(true);
  });

  it('validates lastName', () => {
    instance.ngOnInit();
    updateForm(
      TestData.user.firstName,
      '',
      TestData.user.email
    );
    expect(instance.lastName.valid).toEqual(false);
    updateForm(
      TestData.user.firstName,
      TestData.user.lastName,
      TestData.user.email
    );
    expect(instance.lastName.valid).toEqual(true);
  });

  it('validates email', () => {
    instance.ngOnInit();
    updateForm(
      TestData.user.firstName,
      TestData.user.lastName,
      ''
    );
    expect(instance.email.valid).toEqual(false);
    updateForm(
      TestData.user.firstName,
      TestData.user.lastName,
      TestData.user.email
    );
    expect(instance.email.valid).toEqual(true);
  });

  it('sets blur to true onSave()', () => {
    instance.userForm = { valid: false };
    instance.onSave();
    expect(instance.blur.firstName).toEqual(true);
    expect(instance.blur.lastName).toEqual(true);
    expect(instance.blur.email).toEqual(true);
  });


  it('dispatches action to update account', () => {
    instance.userForm = {
      value: TestData.user,
      valid: true
    };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.userActions, 'updateUser');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingUser);
    expect(instance.userActions.updateUser).toHaveBeenCalledWith(TestData.user);
  });

  it('gets firstName', () => {
    instance.userForm = {
      get: (key: string) => TestData.user[key]
    };
    expect(instance.firstName).toEqual(TestData.user.firstName);
  });

  it('gets lastName', () => {
    instance.userForm = {
      get: (key: string) => TestData.user[key]
    };
    expect(instance.lastName).toEqual(TestData.user.lastName);
  });

  it('gets email', () => {
    instance.userForm = {
      get: (key: string) => TestData.user[key]
    };
    expect(instance.email).toEqual(TestData.user.email);
  });
});
