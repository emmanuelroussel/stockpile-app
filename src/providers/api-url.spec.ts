import { ApiUrl } from './api-url';
import { PlatformMock, PlatformMockIsCore, PlatformMockIsCordova } from '../mocks';

describe('ApiUrl Provider', () => {

  let instance: ApiUrl = null;

  it('is created', () => {
    instance = new ApiUrl(<any> new PlatformMock);
    expect(instance).not.toBeNull();
  });

  it('returns remote URL on cordova platform', () => {
    instance = new ApiUrl(<any> new PlatformMockIsCordova);
    // URL starts with https:
    expect(instance.getUrl()).toMatch(/^https:/);
  });

  it('returns relative URL when not on cordova platform', () => {
    instance = new ApiUrl(<any> new PlatformMockIsCore);
    // URL starts with forward slash
    expect(instance.getUrl()).toMatch(/^\//);
  });
});
