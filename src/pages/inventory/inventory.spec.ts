import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { InventoryPage } from './inventory';
import { Statuses } from '../../constants';

let fixture: ComponentFixture<InventoryPage> = null;
let instance: any = null;

describe('Inventory Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([InventoryPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('initializes with a segment of all', () => {
    expect(instance.segment).toEqual(Statuses.all);
  });

  it('gets categories and items', fakeAsync(() => {
    instance.inventoryData.categories = TestData.categories;
    instance.inventoryData.items = TestData.items;
    instance.ngOnInit();
    tick();
    expect(instance.allCategories).toEqual(TestData.categories.results);
    expect(instance.allItems).toEqual(TestData.items);
    expect(instance.filteredItems).toEqual(TestData.items);
  }));

  it('shows toast if error while getting categories or items', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.stockpileData, 'showToast');
    instance.ngOnInit();
    tick();
    expect(instance.stockpileData.showToast).toHaveBeenCalledTimes(2);
  }));

  it('filters items on filterItems()', () => {
    instance.selectedCategoryIDs = TestData.selectedCategoryIDs;
    instance.allItems = TestData.items;
    instance.segment = Statuses.rented;
    instance.filterItems();
    expect(instance.filteredItems).toEqual(TestData.filteredRentedItems);
  });

  it('only filters items on based on categories on filterItems() if status is all', () => {
    instance.selectedCategoryIDs = TestData.selectedCategoryIDs;
    instance.allItems = TestData.items;
    instance.segment = Statuses.all;
    instance.filterItems();
    expect(instance.filteredItems).toEqual(TestData.filteredAllItems);
  });
});
