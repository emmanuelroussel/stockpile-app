import { UserData } from './user-data';
import { TestData } from '../test-data';

let userData: UserData = null;

describe('UserData Provider', () => {

  beforeEach(() => {
    userData = new UserData();
  });

  it('is created', () => {
    expect(userData).not.toBeNull();
  });

  it('returns an empty promise on login()', () => {
    userData.login(TestData.credentials.email, TestData.credentials.password).then(
      success => expect(true),
      err => expect(false));
  });
});
