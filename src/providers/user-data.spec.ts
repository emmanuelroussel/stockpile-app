import { TestBed, inject } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Storage } from '@ionic/storage';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { UserData } from './user-data';
import { TestData } from '../test-data';
import { StockpileData } from './stockpile-data';
import { StockpileDataMock, StorageMock } from '../mocks';

describe('UserData Provider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
    expect(userData).not.toBeNull();
  }));

  it('returns a login response on login()', async(inject([UserData, MockBackend], (userData: UserData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.loginResponse) })))
    );

    userData.login(TestData.credentials.email, TestData.credentials.password).then(res => {
      expect(res).toEqual(TestData.loginResponse);
    });
  })));

  it('returns a promise on isLoggedIn', inject([UserData], (userData: UserData) => {
    userData.isLoggedIn().then(
      data => expect(data).toBeTruthy(),
      err => expect(false).toBeTruthy()
    );
  }));
});
