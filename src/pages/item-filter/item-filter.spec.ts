import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import {
  AlertMock,
  NavParamsMock,
  BrandsActionsMock,
  CategoriesActionsMock,
  ModelsActionsMock,
  BrandsServiceMock,
  CategoriesServiceMock,
  ModelsServiceMock,
  LayoutActionsMock
} from '../../mocks';
import { LoadingMessages } from '../../constants';
import { ItemFilterPage } from './item-filter';
import { ItemProperties } from '../../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: ItemFilterPage = null;

describe('ItemFilter Page', () => {

  beforeEach(() => {
    instance = new ItemFilterPage(
      <any> new ViewController,
      <any> new NavParamsMock,
      <any> new AlertMock,
      <any> new BrandsActionsMock,
      <any> new BrandsServiceMock,
      <any> new ModelsActionsMock,
      <any> new ModelsServiceMock,
      <any> new CategoriesActionsMock,
      <any> new CategoriesServiceMock,
      <any> new LayoutActionsMock
    );
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('gets navParam brandID', () => {
    instance.navParams.param = TestData.brand.brandID;
    instance.ngOnInit();
    expect(instance.brandID).toEqual(TestData.brand.brandID);
  });

  it('gets navParam type', () => {
    instance.navParams.param = ItemProperties.brand;
    instance.ngOnInit();
    expect(instance.type).toEqual(ItemProperties.brand);
  });

  it('filters models if type is model', () => {
    instance.navParams.param = ItemProperties.model;
    spyOn(instance.modelsActions, 'filterModels');
    instance.ngOnInit();
    expect(instance.modelsActions.filterModels).toHaveBeenCalled();
  });

  it('filters brands on onSearch()', () => {
    instance.type = ItemProperties.brand;
    const event = {
      target: {
        value: TestData.queryText
      }
    };
    spyOn(instance.brandsActions, 'filterBrands');
    instance.onSearch(event);
    expect(instance.brandsActions.filterBrands).toHaveBeenCalledWith(TestData.queryText);
  });

  it('filters models on onSearch()', () => {
    instance.type = ItemProperties.model;
    instance.brandID = TestData.brand.brandID;
    const event = {
      target: {
        value: TestData.queryText
      }
    };
    spyOn(instance.modelsActions, 'filterModels');
    instance.onSearch(event);
    expect(instance.modelsActions.filterModels).toHaveBeenCalledWith(TestData.brand.brandID, TestData.queryText);
  });

  it('filters categories on onSearch()', () => {
    instance.type = ItemProperties.category;
    const event = {
      target: {
        value: TestData.queryText
      }
    };
    spyOn(instance.categoriesActions, 'filterCategories');
    instance.onSearch(event);
    expect(instance.categoriesActions.filterCategories).toHaveBeenCalledWith(TestData.queryText);
  });

  it('dismisses modal on dismiss()', () => {
    spyOn(instance.viewCtrl, 'dismiss');
    instance.onDismiss(TestData.brand);
    expect(instance.viewCtrl.dismiss).toHaveBeenCalledWith(TestData.brand);
  });

  it('creates an alert onCreate()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.type = '';
    instance.onCreateNew();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('creates new brand on createNewElement() if type is brand', () => {
    instance.elements = Observable.of(TestData.brands);
    instance.type = ItemProperties.brand;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.brandsActions, 'createBrand');
    instance.createNewElement(TestData.brand.name);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingBrand);
    expect(instance.brandsActions.createBrand).toHaveBeenCalledWith(TestData.brand.name);
  });

  it('creates new model on createNewElement() if type is model', () => {
    instance.elements = Observable.of(TestData.models);
    instance.type = ItemProperties.model;
    instance.brandID = TestData.model.brandID;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.modelsActions, 'createModel');
    instance.createNewElement(TestData.model.name);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingModel);
    expect(instance.modelsActions.createModel).toHaveBeenCalledWith(TestData.model.name, TestData.model.brandID);
  });

  it('creates new category on createNewElement() if type is category', () => {
    instance.elements = Observable.of(TestData.categories);
    instance.type = ItemProperties.category;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.categoriesActions, 'createCategory');
    instance.createNewElement(TestData.category.name);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingCategory);
    expect(instance.categoriesActions.createCategory).toHaveBeenCalledWith(TestData.category.name);
  });
});
