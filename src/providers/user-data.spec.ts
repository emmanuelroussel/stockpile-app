import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Storage } from '@ionic/storage';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { ApiUrl } from './api-url';
import { UserData } from './user-data';
import { TestData } from '../test-data';
import { StockpileData } from './stockpile-data';
import { ApiUrlMock, StockpileDataMock, StorageMock } from '../mocks';

describe('UserData Provider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiUrl, useClass: ApiUrlMock },
        UserData,
        { provide: Storage, useClass: StorageMock },
        { provide: StockpileData, useClass: StockpileDataMock },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: AuthHttp,
          useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
              noJwtError: true
            }), http);
          },
          deps: [Http]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('is created', inject([UserData], (userData: UserData) => {
    expect(userData).toBeTruthy();
  }));

  it('returns a login response on login()', fakeAsync(inject([UserData, MockBackend], (userData: UserData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.loginResponse) })))
    );

    userData.login(TestData.credentials.email, TestData.credentials.password).then(
      res => expect(res).toEqual(TestData.loginResponse),
      err => fail(err)
    );
  })));

  it('deletes id_token on logout()', inject([UserData], (userData: UserData) => {
    spyOn(userData.storage, 'remove');
    userData.logout();
    expect(userData.storage.remove).toHaveBeenCalledWith('id_token');
  }));

  it('returns a promise on isLoggedIn', inject([UserData], (userData: UserData) => {
    userData.isLoggedIn().then(
      data => expect(data).toBeTruthy(),
      err => fail(err)
    );
  }));

  it('returns an error message if error on login()', fakeAsync(inject([UserData, MockBackend], (userData: UserData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockError(new Response(new ResponseOptions({ body: { message: TestData.error } })))
    );
    tick();
    userData.login(TestData.credentials.email, TestData.credentials.password).then(
      res => fail('Did not return an error'),
      err => expect(err).toEqual(TestData.error)
    );
  })));

  it('gets token from storage', inject([UserData], (userData: UserData) => {
    spyOn(userData.storage, 'get').and.callThrough();
    userData.setUser();
    expect(userData.storage.get).toHaveBeenCalledWith('id_token');
  }));
});
