import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import { NavParamsMock } from '../../mocks';

import { InventoryFilterPage } from './inventory-filter';

let inventoryFilterPage: InventoryFilterPage = null;

describe('InventoryFilter Page', () => {

  beforeEach(() => {
    inventoryFilterPage = new InventoryFilterPage(
      <any> new ViewController,
      <any> new NavParamsMock
    );
  });

  it('is created', () => {
    expect(inventoryFilterPage).toBeTruthy();
  });

  it('gets navParam brands', () => {
    inventoryFilterPage.navParams.param = TestData.brands.results;
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.brands).toEqual(TestData.brands.results);
  });

  it('gets navParam models', () => {
    inventoryFilterPage.navParams.param = TestData.models.results;
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.models).toEqual(TestData.models.results);
  });

  it('gets navParam categories', () => {
    inventoryFilterPage.navParams.param = TestData.categories.results;
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.categories).toEqual(TestData.categories.results);
  });

  it('gets navParam selectedBrandID', () => {
    spyOn(inventoryFilterPage, 'filterModels');
    inventoryFilterPage.navParams.param = TestData.apiItem.brandID;
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.selectedBrandID).toEqual(TestData.apiItem.brandID);
  });

  it('gets navParam selectedModelID', () => {
    spyOn(inventoryFilterPage, 'filterModels');
    inventoryFilterPage.navParams.param = TestData.apiItem.modelID;
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.selectedModelID).toEqual(TestData.apiItem.modelID);
  });

  it('gets navParam selectedCategoryID', () => {
    spyOn(inventoryFilterPage, 'filterModels');
    inventoryFilterPage.navParams.param = TestData.apiItem.categoryID;
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.selectedCategoryID).toEqual(TestData.apiItem.categoryID);
  });

  it('calls filterModels if selectedBrandID is not -1', () => {
    inventoryFilterPage.navParams.param = TestData.apiItem.brandID;
    spyOn(inventoryFilterPage, 'filterModels');
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.filterModels).toHaveBeenCalled();
  });

  it('does not call filterModels if selectedBrandID is -1', () => {
    inventoryFilterPage.navParams.param = -1;
    spyOn(inventoryFilterPage, 'filterModels');
    inventoryFilterPage.ngOnInit();
    expect(inventoryFilterPage.filterModels).not.toHaveBeenCalled();
  });

  it('filters models on filterModels()', () => {
    inventoryFilterPage.models = TestData.models.results;
    inventoryFilterPage.selectedBrandID = TestData.apiItem.brandID;
    inventoryFilterPage.filterModels();
    expect(inventoryFilterPage.filteredModels).toEqual(TestData.filteredModels);
  });

  it('resets filters on resetFilters()', () => {
    spyOn(inventoryFilterPage, 'applyFilters');
    inventoryFilterPage.resetFilters();
    expect(inventoryFilterPage.selectedBrandID).toEqual(-1);
    expect(inventoryFilterPage.selectedModelID).toEqual(-1);
    expect(inventoryFilterPage.selectedCategoryID).toEqual(-1);
    expect(inventoryFilterPage.applyFilters).toHaveBeenCalled();
  });

  it('dismisses modal on dismiss', () => {
    spyOn(inventoryFilterPage.viewCtrl, 'dismiss');
    inventoryFilterPage.dismiss();
    expect(inventoryFilterPage.viewCtrl.dismiss).toHaveBeenCalled();
  });

  it('dismisses modal on applyFilters', () => {
    inventoryFilterPage.selectedBrandID = TestData.apiItem.brandID;
    inventoryFilterPage.selectedModelID = TestData.apiItem.modelID;
    inventoryFilterPage.selectedCategoryID = TestData.apiItem.categoryID;

    const ids = {
      selectedBrandID: TestData.apiItem.brandID,
      selectedModelID: TestData.apiItem.modelID,
      selectedCategoryID: TestData.apiItem.categoryID
    };

    spyOn(inventoryFilterPage.viewCtrl, 'dismiss');
    inventoryFilterPage.applyFilters();
    expect(inventoryFilterPage.viewCtrl.dismiss).toHaveBeenCalledWith(ids);
  });
});
