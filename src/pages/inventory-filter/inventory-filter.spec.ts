import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import { NavParamsMock } from '../../mocks';

import { InventoryFilterPage } from './inventory-filter';

let instance: InventoryFilterPage = null;

describe('InventoryFilter Page', () => {

  beforeEach(() => {
    instance = new InventoryFilterPage(
      <any> new ViewController,
      <any> new NavParamsMock
    );
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('gets navParam brands', () => {
    instance.navParams.param = TestData.brands.results;
    instance.ngOnInit();
    expect(instance.brands).toEqual(TestData.brands.results);
  });

  it('gets navParam models', () => {
    instance.navParams.param = TestData.models.results;
    instance.ngOnInit();
    expect(instance.models).toEqual(TestData.models.results);
  });

  it('gets navParam categories', () => {
    instance.navParams.param = TestData.categories.results;
    instance.ngOnInit();
    expect(instance.categories).toEqual(TestData.categories.results);
  });

  it('gets navParam selectedBrandID', () => {
    spyOn(instance, 'onFilterModels');
    instance.navParams.param = TestData.apiItem.brandID;
    instance.ngOnInit();
    expect(instance.selectedBrandID).toEqual(TestData.apiItem.brandID);
  });

  it('gets navParam selectedModelID', () => {
    spyOn(instance, 'onFilterModels');
    instance.navParams.param = TestData.apiItem.modelID;
    instance.ngOnInit();
    expect(instance.selectedModelID).toEqual(TestData.apiItem.modelID);
  });

  it('gets navParam selectedCategoryID', () => {
    spyOn(instance, 'onFilterModels');
    instance.navParams.param = TestData.apiItem.categoryID;
    instance.ngOnInit();
    expect(instance.selectedCategoryID).toEqual(TestData.apiItem.categoryID);
  });

  it('calls filterModels if selectedBrandID is not -1', () => {
    instance.navParams.param = TestData.apiItem.brandID;
    spyOn(instance, 'onFilterModels');
    instance.ngOnInit();
    expect(instance.onFilterModels).toHaveBeenCalled();
  });

  it('does not call onFilterModels if selectedBrandID is -1', () => {
    instance.navParams.param = -1;
    spyOn(instance, 'onFilterModels');
    instance.ngOnInit();
    expect(instance.onFilterModels).not.toHaveBeenCalled();
  });

  it('filters models on filterModels()', () => {
    instance.models = TestData.models.results;
    instance.selectedBrandID = TestData.apiItem.brandID;
    instance.onFilterModels();
    expect(instance.filteredModels).toEqual(TestData.filteredModels);
  });

  it('resets filters on resetFilters()', () => {
    spyOn(instance, 'onApplyFilters');
    instance.onResetFilters();
    expect(instance.selectedBrandID).toEqual(-1);
    expect(instance.selectedModelID).toEqual(-1);
    expect(instance.selectedCategoryID).toEqual(-1);
    expect(instance.onApplyFilters).toHaveBeenCalled();
  });

  it('dismisses modal on dismiss', () => {
    spyOn(instance.viewCtrl, 'dismiss');
    instance.onDismiss();
    expect(instance.viewCtrl.dismiss).toHaveBeenCalled();
  });

  it('dismisses modal on applyFilters', () => {
    instance.selectedBrandID = TestData.apiItem.brandID;
    instance.selectedModelID = TestData.apiItem.modelID;
    instance.selectedCategoryID = TestData.apiItem.categoryID;

    const ids = {
      selectedBrandID: TestData.apiItem.brandID,
      selectedModelID: TestData.apiItem.modelID,
      selectedCategoryID: TestData.apiItem.categoryID
    };

    spyOn(instance.viewCtrl, 'dismiss');
    instance.onApplyFilters();
    expect(instance.viewCtrl.dismiss).toHaveBeenCalledWith(ids);
  });
});
