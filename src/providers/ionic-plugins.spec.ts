import { PlatformMock, PlatformMockIsCore, PlatformMockIsCordova, ToastMock } from '../mocks';

import { IonicPlugins } from './ionic-plugins';
import { TestData } from '../test-data';

let ionicPlugins: IonicPlugins = null;

describe('IonicPlugins Provider', () => {

  beforeEach(() => {
    ionicPlugins = new IonicPlugins((<any> new PlatformMock), (<any> new ToastMock));
  });

  it('is created', () => {
    expect(ionicPlugins).toBeTruthy();
  });

  it('shows toast if cordova is available', () => {
    ionicPlugins = new IonicPlugins((<any> new PlatformMockIsCordova), (<any> new ToastMock));
    spyOn(ionicPlugins.toast, 'showWithOptions').and.callThrough();
    ionicPlugins.showToast(TestData.response.message);
    expect(ionicPlugins.toast.showWithOptions).toHaveBeenCalled();
  });

  it('logs message to the console if cordova is not available', () => {
    ionicPlugins = new IonicPlugins((<any> new PlatformMockIsCore), (<any> new ToastMock));
    spyOn(console, 'log');
    ionicPlugins.showToast(TestData.response.message);
    expect(console.log).toHaveBeenCalledWith(TestData.response.message);
  });
});
