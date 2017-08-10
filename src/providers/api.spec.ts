import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { ApiUrl } from './api-url';
import { TestData } from '../test-data';
import { Api } from './api';
import { ApiUrlMock } from '../mocks';

describe('Api Provider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiUrl, useClass: ApiUrlMock },
        Api,
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

  it('is created', inject([Api], (instance: Api) => {
    expect(instance).toBeTruthy();
  }));

  it('returns a response on get()', fakeAsync(inject([Api, MockBackend], (instance: Api, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    instance.get(TestData.endpoint).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a response on put()', fakeAsync(inject([Api, MockBackend], (instance: Api, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    instance.put(TestData.endpoint, TestData.body).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a response on delete()', fakeAsync(inject([Api, MockBackend], (instance: Api, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    instance.delete(TestData.endpoint).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));
});
