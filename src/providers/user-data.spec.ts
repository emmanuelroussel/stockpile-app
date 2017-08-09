import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Storage } from '@ionic/storage';

import { ApiUrl } from './api-url';
import { UserData } from './user-data';
import { TestData } from '../test-data';
import { Api } from './api';
import { ApiUrlMock, StorageMock, PlatformMock, ApiMock } from '../mocks';

describe('UserData Provider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiUrl, useClass: ApiUrlMock },
        UserData,
        { provide: Api, useClass: ApiMock },
        { provide: Storage, useClass: StorageMock },
        { provide: Platform, useClass: PlatformMock },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('is created', inject([UserData], (userData: UserData) => {
    expect(userData).toBeTruthy();
  }));

  it('returns a response on login', inject([UserData, MockBackend], (userData: UserData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );

    userData.login(TestData.credentials).subscribe(
      data => expect(data).toEqual(TestData.response),
      err => fail(err)
    );
  }));

  it('deletes id_token on logout()', inject([UserData], (userData: UserData) => {
    spyOn(userData.storage, 'remove');
    userData.logout();
    expect(userData.storage.remove).toHaveBeenCalledWith('id_token');
    expect(userData.userID).toEqual('');
    expect(userData.organizationID).toEqual('');
  }));

  it('returns a promise on isLoggedIn', inject([UserData], (userData: UserData) => {
    userData.isLoggedIn().then(
      data => expect(data).toBeTruthy(),
      err => fail(err)
    );
  }));

  it('gets token from storage', inject([UserData], (userData: UserData) => {
    spyOn(userData.storage, 'get').and.callThrough();
    userData.setUser();
    expect(userData.storage.get).toHaveBeenCalledWith('id_token');
  }));

  it('returns a user on getUser()', fakeAsync(inject([UserData], (userData: UserData) => {
    userData.storage.return = TestData.token;
    userData.api.value = TestData.user;

    userData.getUser().subscribe(
      res => expect(res).toEqual(TestData.user),
      err => fail(err)
    );
  })));

  it('returns a message on changePassword()', fakeAsync(inject([UserData], (userData: UserData) => {
    userData.storage.return = TestData.token;

    userData.changePassword(TestData.passwords.currentPassword, TestData.passwords.newPassword).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns an organization on getOrganization()', fakeAsync(inject([UserData], (userData: UserData) => {
    userData.api.value = TestData.organization;

    userData.getOrganization().subscribe(
      res => expect(res).toEqual(TestData.organization),
      err => fail(err)
    );
  })));

  it('returns a user on updateUser()', fakeAsync(inject([UserData], (userData: UserData) => {
    userData.api.value = TestData.user;

    userData.updateUser(TestData.user).subscribe(
      res => expect(res).toEqual(TestData.user),
      err => fail(err)
    );
  })));

  it('gets something on getInfo()', fakeAsync(inject([UserData], (userData: UserData) => {
    userData.api.value = TestData.organization;

    userData.getInfo().subscribe(
      res => expect(res).toEqual(TestData.organization),
      err => fail(err)
    );
  })));
});
