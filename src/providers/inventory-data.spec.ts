import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { TestData } from '../test-data';
import { InventoryData } from './inventory-data';
import { StockpileData } from './stockpile-data';
import { StockpileDataMock } from '../mocks';

describe('InventoryData Provider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InventoryData,
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

  it('is created', inject([InventoryData], (inventoryData: InventoryData) => {
    expect(InventoryData).not.toBeNull();
  }));

  it('returns an item on getItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.item) })))
    );
    tick();
    inventoryData.getItem(TestData.item.tag).subscribe(item => {
      expect(item).toEqual(TestData.item);
    });
  })));

  it('returns a message on addItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addItem(TestData.item).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns an empty promise on editItem()', inject([InventoryData], (inventoryData: InventoryData) => {
    inventoryData.editItem(TestData.item).subscribe(
      success => expect(true),
      err => expect(false)
    );
  }));

  it('returns a message on deleteItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.deleteItem(TestData.item.tag).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns an empty promise on rent()', inject([InventoryData], (inventoryData: InventoryData) => {
    inventoryData.rent(TestData.items, TestData.details).subscribe(
      success => expect(true),
      err => expect(false)
    );
  }));

  it('returns an empty promise on return()', inject([InventoryData], (inventoryData: InventoryData) => {
    inventoryData.return(TestData.items).subscribe(
      success => expect(true),
      err => expect(false)
    );
  }));

  it('returns brands on getBrands()', inject([InventoryData], (inventoryData: InventoryData) => {
    inventoryData.getBrands().subscribe(
      brands => expect(brands).toEqual(TestData.brands),
      err => expect(false)
    );
  }));

  it('returns models on getModels()', inject([InventoryData], (inventoryData: InventoryData) => {
    inventoryData.getModels().subscribe(
      models => expect(models).toEqual(TestData.models),
      err => expect(false)
    );
  }));

  it('returns categories on getCategories()', inject([InventoryData], (inventoryData: InventoryData) => {
    inventoryData.getCategories().subscribe(
      categories => expect(categories).toEqual(TestData.categories),
      err => expect(false)
    );
  }));

  it('returns conditions on getStatuses()', inject([InventoryData], (inventoryData: InventoryData) => {
    inventoryData.getStatuses().subscribe(
      statuses => expect(statuses).toEqual(TestData.statuses),
      err => expect(false)
    );
  }));
});
