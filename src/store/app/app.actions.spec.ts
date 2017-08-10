import { AppActions } from './app.actions';

let instance: AppActions = null;

describe('App Actions', () => {

  beforeEach(() => {
    instance = new AppActions();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });
});
