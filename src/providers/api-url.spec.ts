import { ApiUrl } from './api-url';
import { PlatformMock } from '../mocks';

describe('ApiUrl Provider', () => {

  let apiUrl: ApiUrl = null;

  beforeEach(() => {
    apiUrl = new ApiUrl(<any> new PlatformMock);
  });

  it('is created', () => {
    expect(apiUrl).not.toBeNull();
  });

  it('returns remote URL when not on core platform', () => {
    apiUrl.platform.currPlatform = 'android';
    // URL starts with https:
    expect(apiUrl.getUrl()).toMatch(/^https:/);
  });

  it('returns relative URL on core platform', () => {
    apiUrl.platform.currPlatform = 'core';
    // URL starts with forward slash
    expect(apiUrl.getUrl()).toMatch(/^\//);
  });
});
