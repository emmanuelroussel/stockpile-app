import { ApiUrl } from './api-url';
import { PlatformMock, PlatformMockIsCore, PlatformMockIsCordova } from '../mocks';

describe('ApiUrl Provider', () => {

  let apiUrl: ApiUrl = null;

  it('is created', () => {
    apiUrl = new ApiUrl(<any> new PlatformMock);
    expect(apiUrl).not.toBeNull();
  });

  it('returns remote URL on cordova platform', () => {
    apiUrl = new ApiUrl(<any> new PlatformMockIsCordova);
    // URL starts with https:
    expect(apiUrl.getUrl()).toMatch(/^https:/);
  });

  it('returns relative URL when not on cordova platform', () => {
    apiUrl = new ApiUrl(<any> new PlatformMockIsCore);
    // URL starts with forward slash
    expect(apiUrl.getUrl()).toMatch(/^\//);
  });
});
