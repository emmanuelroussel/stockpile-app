import { UserData } from './user-data';

let userData: UserData = null;

describe('UserData Provider', () => {

  beforeEach(() => {
    userData = new UserData();
  });

  it('is created', () => {
    expect(userData).not.toBeNull();
  });

  it('returns an empty promise on login()', () => {
    userData.login('hello@me.com', 'monkey').then(
      (success) => expect(true),
      (err) => expect(false));
  });
});
