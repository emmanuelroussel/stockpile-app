import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { InventoryPage } from './inventory';
import { Actions } from '../../constants';
import { EditItemPage } from '../edit-item/edit-item';
import { ViewItemPage } from '../view-item/view-item';
import { InventoryFilterPage } from '../inventory-filter/inventory-filter';

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
    expect(instance.segment).toEqual(-1);
  });

  it('gets brands, models, categories and items', fakeAsync(() => {
    instance.inventoryData.brands = TestData.brands;
    instance.inventoryData.models = TestData.models;
    instance.inventoryData.categories = TestData.categories;
    spyOn(instance, 'onFilterItems');
    instance.ionViewWillEnter();
    tick();
    expect(instance.allBrands).toEqual(TestData.brands.results);
    expect(instance.allModels).toEqual(TestData.models.results);
    expect(instance.allCategories).toEqual(TestData.categories.results);
    expect(instance.onFilterItems).toHaveBeenCalled();
  }));

  it('shows toast if error while getting brands, models, categories or items', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.ionViewWillEnter();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledTimes(4);
  }));

  it('calls inventoryData.filterItems on loadItems()', fakeAsync(() => {
    instance.selectedBrandID = TestData.apiItem.brandID;
    instance.selectedModelID = TestData.apiItem.modelID;
    instance.selectedCategoryID = TestData.apiItem.categoryID;
    instance.segment = 0;
    instance.inventoryData.allItems = TestData.filteredItems;
    instance.offset = 10;
    instance.items = [];
    spyOn(instance.inventoryData, 'filterItems').and.callThrough();
    instance.loadItems();
    tick();
    expect(instance.inventoryData.filterItems).toHaveBeenCalledWith(TestData.apiItem.brandID, TestData.apiItem.modelID, TestData.apiItem.categoryID, 0, 10, 10);
    expect(instance.items).toEqual(TestData.filteredItems.results);
  }));

  it('sets loadMoreItems to false if inventoryData.filterItems returns nothing', fakeAsync(() => {
    instance.inventoryData.allItems = { results: [] };
    instance.items = TestData.filteredItems.results;
    instance.loadMoreItems = true;
    instance.loadItems();
    tick();
    expect(instance.loadMoreItems).toEqual(false);
    expect(instance.items).toEqual(TestData.filteredItems.results);
  }));

  it('shows toast if error on loadItems()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.loadItems();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes ViewItemPage on nav on viewItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onViewItem(TestData.item);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ViewItemPage, { item: TestData.item });
  });

  it('pushes EditItemPage on nav onAdd()', fakeAsync(() => {
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditItemPage, { barcode: TestData.barcodeData.text, action: Actions.add });
  }));

  it('shows toast if error in onAdd()', fakeAsync(() => {
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showToast');
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  }));

  it('does nothing if scan is cancelled', fakeAsync(() => {
    instance.barcodeScanner.cancel = true;
    spyOn(instance.notifications, 'showToast');
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    tick();
    expect(instance.notifications.showToast).not.toHaveBeenCalled();
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  }));

  it('toggles showFilters on toggleFilters()', () => {
    instance.showFilters = true;
    instance.toggleFilters();
    expect(instance.showFilters).toEqual(false);
  });

  it('creates a modal onOpenFilters()', () => {
    instance.allBrands = TestData.brands.results;
    instance.allModels = TestData.models.results;
    instance.allCategories = TestData.categories.results;
    instance.selectedBrandID = TestData.apiItem.brandID;
    instance.selectedModelID = TestData.apiItem.modelID;
    instance.selectedCategoryID = TestData.apiItem.categoryID;
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onOpenFilters();
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(InventoryFilterPage, {
      brands: TestData.brands.results,
      models: TestData.models.results,
      categories: TestData.categories.results,
      selectedBrandID: TestData.apiItem.brandID,
      selectedModelID: TestData.apiItem.modelID,
      selectedCategoryID: TestData.apiItem.categoryID
    });
  });
});
