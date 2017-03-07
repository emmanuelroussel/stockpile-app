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

  it('returns items on getAllItems()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.items) })))
    );
    tick();
    inventoryData.getAllItems().subscribe(item => {
      expect(item).toEqual(TestData.items);
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

  it('returns a message on editItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.editItem(TestData.item, TestData.item.tag).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns a message on deleteItem()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.deleteItem(TestData.item.tag).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns items on filterItems()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.items) })))
    );
    tick();
    inventoryData.filterItems(TestData.item.brandID, TestData.item.modelID, TestData.item.categoryID, 0).subscribe(res => {
      expect(res).toEqual(TestData.items);
    });
  })));

  it('returns a message on rent()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.rent(TestData.details).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns a message on return()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.return(TestData.item.tag).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns brands on getBrands()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.brands) })))
    );
    tick();
    inventoryData.getBrands().subscribe(res => {
      expect(res).toEqual(TestData.brands);
    });
  })));

  it('returns brands on getModels()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.models) })))
    );
    tick();
    inventoryData.getModels().subscribe(res => {
      expect(res).toEqual(TestData.models);
    });
  })));

  it('returns brands on getCategories()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.categories) })))
    );
    tick();
    inventoryData.getCategories().subscribe(res => {
      expect(res).toEqual(TestData.categories);
    });
  })));

  it('returns a message on addBrand()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addBrand(TestData.brands.results[0].name).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns a message on addModel()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addModel(TestData.models.results[0].name, TestData.brands.results[0].id).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));

  it('returns a message on addCategory()', fakeAsync(inject([InventoryData, MockBackend], (inventoryData: InventoryData, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe(
      conn => conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(TestData.response) })))
    );
    tick();
    inventoryData.addCategory(TestData.categories.results[0].name).subscribe(res => {
      expect(res).toEqual(TestData.response);
    });
  })));
});
