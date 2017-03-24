import { PlatformMock, PlatformMockIsCore, PlatformMockIsCordova, ToastMock } from '../mocks';

import { Notifications } from './notifications';
import { TestData } from '../test-data';

let notifications: Notifications = null;

describe('IonicPlugins Provider', () => {

  beforeEach(() => {
    notifications = new Notifications((<any> new PlatformMock), (<any> new ToastMock));
  });

  it('is created', () => {
    expect(notifications).toBeTruthy();
  });

  it('shows toast if cordova is available', () => {
    notifications = new Notifications((<any> new PlatformMockIsCordova), (<any> new ToastMock));
    spyOn(notifications.toast, 'showWithOptions').and.callThrough();
    notifications.showToast(TestData.response.message);
    expect(notifications.toast.showWithOptions).toHaveBeenCalled();
  });

  it('logs message to the console if cordova is not available', () => {
    notifications = new Notifications((<any> new PlatformMockIsCore), (<any> new ToastMock));
    spyOn(console, 'log');
    notifications.showToast(TestData.response.message);
    expect(console.log).toHaveBeenCalledWith(TestData.response.message);
  });
});
