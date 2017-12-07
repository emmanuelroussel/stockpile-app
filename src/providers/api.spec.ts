import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('is created', async(inject([Api], (instance: Api) => {
    expect(instance).toBeTruthy();
  })));

  it('gets data', async(inject([Api, HttpTestingController],
  (instance: Api, backend: HttpTestingController) => {
    instance.get(TestData.endpoint).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });

    backend.expectOne(`${instance.apiUrl.getUrl()}${TestData.endpoint}`).flush(TestData.response);
  })));

  it('puts data', async(inject([Api, HttpTestingController],
  (instance: Api, backend: HttpTestingController) => {
    instance.put(TestData.endpoint, TestData.body).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });

    backend.expectOne(`${instance.apiUrl.getUrl()}${TestData.endpoint}`).flush(TestData.response);
  })));

  it('posts data', async(inject([Api, HttpTestingController],
  (instance: Api, backend: HttpTestingController) => {
    instance.post(TestData.endpoint, TestData.body).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });

    backend.expectOne(`${instance.apiUrl.getUrl()}${TestData.endpoint}`).flush(TestData.response);
  })));

  it('deletes data', async(inject([Api, HttpTestingController],
  (instance: Api, backend: HttpTestingController) => {
    instance.delete(TestData.endpoint).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });

    backend.expectOne(`${instance.apiUrl.getUrl()}${TestData.endpoint}`).flush(TestData.response);
  })));
});
