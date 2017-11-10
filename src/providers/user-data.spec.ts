import { UserData } from './user-data';
import { TestData } from '../test-data';
import { Api } from './api';
import { ApiMock } from '../mocks';

let instance: UserData = null;

describe('UserData Provider', () => {

  beforeEach(() => {
    instance = new UserData((<any> new ApiMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns a response on login', () => {
    instance.api.value = TestData.loginResponse;

    instance.login(TestData.credentials).subscribe(
      res => expect(res).toEqual(TestData.loginResponse),
      err => fail(err)
    );
  });

  it('returns a user on getUser()', () => {
    instance.api.value = TestData.user;

    instance.getUser().subscribe(
      res => expect(res).toEqual(TestData.user),
      err => fail(err)
    );
  });

  it('returns a message on changePassword()', () => {
    instance.api.value = TestData.response;

    instance.changePassword(TestData.passwords.currentPassword, TestData.passwords.newPassword).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('returns an organization on getOrganization()', () => {
    instance.api.value = TestData.organization;

    instance.getOrganization().subscribe(
      res => expect(res).toEqual(TestData.organization),
      err => fail(err)
    );
  });

  it('returns a user on updateUser()', () => {
    instance.api.value = TestData.user;

    instance.updateUser(TestData.user).subscribe(
      res => expect(res).toEqual(TestData.user),
      err => fail(err)
    );
  });
});
