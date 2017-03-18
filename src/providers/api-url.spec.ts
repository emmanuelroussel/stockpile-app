import { ApiUrl } from './api-url';
import { PlatformMock, PlatformMockIsCore, PlatformMockIsAndroid } from '../mocks';

describe('ApiUrl Provider', () => {

  let apiUrl: ApiUrl = null;

  it('is created', () => {
    apiUrl = new ApiUrl(<any> new PlatformMock);
    expect(apiUrl).not.toBeNull();
  });

  it('returns remote URL when not on core platform', () => {
    apiUrl = new ApiUrl(<any> new PlatformMockIsAndroid);
    // URL starts with https:
    expect(apiUrl.getUrl()).toMatch(/^https:/);
  });

  it('returns relative URL on core platform', () => {
    apiUrl = new ApiUrl(<any> new PlatformMockIsCore);
    // URL starts with forward slash
    expect(apiUrl.getUrl()).toMatch(/^\//);
  });
});
