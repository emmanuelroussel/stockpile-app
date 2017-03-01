import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { InventoryPage } from './inventory';
import { Statuses, Actions } from '../../constants';
import { ItemPage } from '../item/item';

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
    const response = { results: TestData.items };
    instance.inventoryData.categories = TestData.categories;
    instance.inventoryData.allItems = response;
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

  it('calls inventoryData.filterItems on filterItems()', fakeAsync(() => {
    instance.selectedCategoryIDs = TestData.selectedCategoryIDs;
    instance.segment = Statuses.rented;
    instance.inventoryData.items = TestData.items;
    spyOn(instance.inventoryData, 'filterItems').and.callThrough();
    instance.filterItems();
    tick();
    expect(instance.inventoryData.filterItems).toHaveBeenCalledWith(TestData.selectedCategoryIDs, Statuses.rented);
    expect(instance.filteredItems).toEqual(TestData.items);
  }));

  it('shows toast if error on filterItems()', fakeAsync(() => {
    instance.selectedCategoryIDs = TestData.selectedCategoryIDs;
    instance.segment = Statuses.rented;
    instance.inventoryData.resolve = false;
    spyOn(instance.stockpileData, 'showToast');
    instance.filterItems();
    tick();
    expect(instance.stockpileData.showToast).toHaveBeenCalledWith(TestData.error.message);
  }));

  it('pushes ItemPage on nav on viewItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.viewItem(TestData.item);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { tag: TestData.item.tag, action: Actions.edit });
  });
});
