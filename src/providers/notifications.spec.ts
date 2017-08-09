import { PlatformMock, PlatformMockIsCore, PlatformMockIsCordova, ToastMock } from '../mocks';

import { Notifications } from './notifications';
import { TestData } from '../test-data';

let instance: Notifications = null;

describe('Notifications Provider', () => {

  beforeEach(() => {
    instance = new Notifications((<any> new PlatformMock), (<any> new ToastMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('shows toast if cordova is available', () => {
    instance = new Notifications((<any> new PlatformMockIsCordova), (<any> new ToastMock));
    spyOn(instance.toast, 'showWithOptions').and.callThrough();
    instance.showMessage(TestData.response.message);
    expect(instance.toast.showWithOptions).toHaveBeenCalled();
  });

  it('logs message to the console if cordova is not available', () => {
    instance = new Notifications((<any> new PlatformMockIsCore), (<any> new ToastMock));
    spyOn(console, 'log');
    instance.showMessage(TestData.response.message);
    expect(console.log).toHaveBeenCalledWith(TestData.response.message);
  });
});
