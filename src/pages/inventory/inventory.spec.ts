import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { InventoryPage } from './inventory';
import { Actions } from '../../constants';
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
    expect(instance.segment).toEqual(-1);
  });

  it('gets brands, models, categories and items', fakeAsync(() => {
    const response = { results: TestData.items };
    instance.inventoryData.brands = TestData.brands;
    instance.inventoryData.models = TestData.models;
    instance.inventoryData.categories = TestData.categories;
    instance.inventoryData.allItems = response;
    instance.ionViewWillEnter();
    tick();
    expect(instance.allBrands).toEqual(TestData.brands.results);
    expect(instance.allModels).toEqual(TestData.models.results);
    expect(instance.allCategories).toEqual(TestData.categories.results);
    expect(instance.allItems).toEqual(TestData.items);
    expect(instance.filteredItems).toEqual(TestData.items);
  }));

  it('shows toast if error while getting brands, models, categories or items', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.ionViewWillEnter();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledTimes(4);
  }));

  it('calls inventoryData.filterItems on filterItems()', fakeAsync(() => {
    instance.selectedBrandID = TestData.apiItem.brandID;
    instance.selectedModelID = TestData.apiItem.modelID;
    instance.selectedCategoryID = TestData.apiItem.categoryID;
    instance.segment = 0;
    instance.inventoryData.allItems = TestData.filteredItems;
    spyOn(instance, 'filterModels');
    spyOn(instance.inventoryData, 'filterItems').and.callThrough();
    instance.filterItems();
    tick();
    expect(instance.filterModels).toHaveBeenCalled();
    expect(instance.inventoryData.filterItems).toHaveBeenCalledWith(TestData.apiItem.brandID, TestData.apiItem.modelID, TestData.apiItem.categoryID, 0);
    expect(instance.filteredItems).toEqual(TestData.filteredItems.results);
  }));

  it('shows toast if error on filterItems()', fakeAsync(() => {
    instance.segment = 0;
    instance.allModels = TestData.models.results;
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.filterItems();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes ItemPage on nav on viewItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.viewItem(TestData.item);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { barcode: TestData.item.barcode, action: Actions.edit });
  });

  it('filters models on filterModels()', () => {
    instance.allModels = TestData.models.results;
    instance.selectedBrandID = TestData.apiItem.brandID;
    instance.filterModels();
    expect(instance.filteredModels).toEqual(TestData.filteredModels);
  });

  it('pushes ItemPage on nav onAdd()', fakeAsync(() => {
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, { barcode: TestData.barcodeData.text, action: Actions.add });
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
});
