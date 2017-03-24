import { PlatformMock, PlatformMockIsCore, BarcodeScannerMock, ToastMock } from '../mocks';

import { IonicPlugins } from './ionic-plugins';
import { TestData } from '../test-data';

let ionicPlugins: IonicPlugins = null;

describe('IonicPlugins Provider', () => {

  beforeEach(() => {
    ionicPlugins = new IonicPlugins((<any> new PlatformMock), (<any> new BarcodeScannerMock), (<any> new ToastMock));
  });

  it('is created', () => {
    expect(ionicPlugins).toBeTruthy();
  });

  it('logs message to the console if cordova is not available', () => {
    ionicPlugins = new IonicPlugins(<any> new PlatformMockIsCore);
    spyOn(console, 'log');
    ionicPlugins.showToast(TestData.response.message);
    expect(console.log).toHaveBeenCalledWith(TestData.response.message);
  });
});
