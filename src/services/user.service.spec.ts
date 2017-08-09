import { StoreMock } from '../mocks';
import { UserService } from './user.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';

let instance: UserService = null;

describe('User Service', () => {

  beforeEach(() => {
    instance = new UserService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns user', () => {
    expect(instance.getUser()).toEqual(Observable.of(TestData.state.user));
  });

  it('returns loading', () => {
    expect(instance.getLoading()).toEqual(Observable.of(TestData.state.user.loading));
  });
});
