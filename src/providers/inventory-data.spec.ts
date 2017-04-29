import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { ApiUrl } from './api-url';
import { TestData } from '../test-data';
import { InventoryData } from './inventory-data';
import { ApiUrlMock, PlatformMock } from '../mocks';

describe('InventoryData Provider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiUrl, useClass: ApiUrlMock },
        { provide: Platform, useClass: PlatformMock },
        InventoryData,
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

  it('is created', inject([InventoryData], (inventoryData: InventoryData) => {
    expect(InventoryData).toBeTruthy();
  }));

  it('returns a message on addItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addItem(TestData.item).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on editItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.editItem(TestData.item, TestData.item.barcode).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on deleteItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.deleteItem(TestData.item.barcode).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns items on filterItems()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.items) })))
    );
    tick();
    inventoryData.filterItems(TestData.apiItem.brandID, TestData.item.modelID, TestData.item.categoryID, 0).subscribe(
      res => expect(res).toEqual(TestData.items),
      err => fail(err)
    );
  })));

  it('returns a message on rent()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.rent(TestData.details).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on return()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.return(TestData.item.barcode).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns brands on getBrands()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.brands) })))
    );
    tick();
    inventoryData.getBrands().subscribe(
      res => expect(res).toEqual(TestData.brands),
      err => fail(err)
    );
  })));

  it('returns brands on getModels()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.models) })))
    );
    tick();
    inventoryData.getModels().subscribe(
      res => expect(res).toEqual(TestData.models),
      err => fail(err)
    );
  })));

  it('returns brands on getCategories()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.categories) })))
    );
    tick();
    inventoryData.getCategories().subscribe(
      res => expect(res).toEqual(TestData.categories),
      err => fail(err)
    );
  })));

  it('returns a message on addBrand()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addBrand(TestData.brands.results[0].name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on addModel()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addModel(TestData.models.results[0].name, TestData.brands.results[0].id).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on addCategory()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addCategory(TestData.categories.results[0].name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns kits on getKits()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.kits) })))
    );
    tick();
    inventoryData.getKits().subscribe(
      res => expect(res).toEqual(TestData.kits),
      err => fail(err)
    );
  })));

  it('returns kitItems on getKitItems()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.kitItems) })))
    );
    tick();
    inventoryData.getKitItems(TestData.kit.kitID).subscribe(
      res => expect(res).toEqual(TestData.kitItems),
      err => fail(err)
    );
  })));

  it('returns a message on addKitItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addKitItem(TestData.kit.kitID, TestData.kitItem.modelID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on deleteKitItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.deleteKitItem(TestData.kit.kitID, TestData.kitItem.modelID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on addKit()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addKit(TestData.kit.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on editKit()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.editKit(TestData.kit).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns a message on deleteKit()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.deleteKit(TestData.kit.kitID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  })));

  it('returns an error message if error on putEndpoint', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockError(new Response(new ResponseOptions({ body: { message: TestData.error } })))
    );
    tick();
    inventoryData.addItem(TestData.item).subscribe(
      res => fail('Did not return an error'),
      err => expect(err).toEqual(TestData.error)
    );
  })));

  it('returns an error message if error on deleteEndpoint', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockError(new Response(new ResponseOptions({ body: { message: TestData.error } })))
    );
    tick();
    inventoryData.deleteItem(TestData.item.barcode).subscribe(
      res => fail('Did not return an error'),
      err => expect(err).toEqual(TestData.error)
    );
  })));
});
