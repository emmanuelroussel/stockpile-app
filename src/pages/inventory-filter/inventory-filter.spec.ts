import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import {
  NavParamsMock,
  BrandsActionsMock,
  CategoriesActionsMock,
  ModelsActionsMock,
  ItemsActionsMock,
  BrandsServiceMock,
  CategoriesServiceMock,
  ModelsServiceMock,
  ItemsServiceMock,
} from '../../mocks';

import { InventoryFilterPage } from './inventory-filter';

let instance: InventoryFilterPage = null;

describe('InventoryFilter Page', () => {

  beforeEach(() => {
    instance = new InventoryFilterPage(
      <any> new ViewController,
      <any> new NavParamsMock,
      <any> new BrandsServiceMock,
      <any> new BrandsActionsMock,
      <any> new ModelsServiceMock,
      <any> new ModelsActionsMock,
      <any> new CategoriesServiceMock,
      <any> new CategoriesActionsMock,
      <any> new ItemsServiceMock,
      <any> new ItemsActionsMock
    );
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('gets ids from store', () => {
    instance.ngOnInit();
    expect(instance.selectedBrandID).toEqual(TestData.itemFilters.brandID);
    expect(instance.selectedModelID).toEqual(TestData.itemFilters.modelID);
    expect(instance.selectedCategoryID).toEqual(TestData.itemFilters.categoryID);
  });

  it('calls filterModels if selectedBrandID is not -1', () => {
    instance.navParams.param = TestData.apiItem.brandID;
    spyOn(instance, 'onFilterModels');
    instance.ngOnInit();
    expect(instance.onFilterModels).toHaveBeenCalled();
  });

  it('filters models on filterModels()', () => {
    spyOn(instance.modelsActions, 'filterModels');
    instance.onFilterModels();
    expect(instance.modelsActions.filterModels).toHaveBeenCalled();
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
    instance.selectedBrandID = TestData.itemFilters.brandID;
    instance.selectedModelID = TestData.itemFilters.modelID;
    instance.selectedCategoryID = TestData.itemFilters.categoryID;

    const ids = {
      brandID: TestData.itemFilters.brandID,
      modelID: TestData.itemFilters.modelID,
      categoryID: TestData.itemFilters.categoryID
    };

    spyOn(instance.viewCtrl, 'dismiss');
    spyOn(instance.itemsActions, 'updateFilters');
    instance.onApplyFilters();
    expect(instance.viewCtrl.dismiss).toHaveBeenCalled();
    expect(instance.itemsActions.updateFilters).toHaveBeenCalledWith(ids);
  });
});
