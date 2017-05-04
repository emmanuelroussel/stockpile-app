import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { ItemProperties } from '../../constants';

import { AddKitItemPage } from './add-kit-item';
import { ItemFilterPage } from '../item-filter/item-filter';

let fixture: ComponentFixture<AddKitItemPage> = null;
let instance: any = null;

describe('AddKitItem Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([AddKitItemPage]).then(compiled => {
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

  it('gets brands and models', fakeAsync(() => {
    instance.itemPropertyData.brands = TestData.brands;
    instance.itemPropertyData.models = TestData.models;
    instance.ngOnInit();
    tick();
    expect(instance.allBrands).toEqual(TestData.brands.results);
    expect(instance.allModels).toEqual(TestData.models.results);
  }));

  it('shows toast if error while getting brands, models and categories', fakeAsync(() => {
    instance.itemPropertyData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.ngOnInit();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledTimes(2);
  }));

  it('pops nav onAdd()', () => {
    spyOn(instance.events, 'publish');
    spyOn(instance.navCtrl, 'pop');
    instance.kitItem = TestData.kitItem;
    instance.onAdd();
    expect(instance.events.publish).toHaveBeenCalledWith('kit-item:added', TestData.kitItem);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
  });

  it('filter models on filterModels()', () => {
    instance.allModels = TestData.models.results;
    instance.kitItem.brandID = TestData.apiItem.brandID;
    instance.filterModels();
    expect(instance.filteredModels).toEqual(TestData.filteredModels);
  });

  it('creates a modal on presentModal()', () => {
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onPresentModal(TestData.brands.results, ItemProperties.brand);
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, { elements: TestData.brands.results, type: ItemProperties.brand });
  });

  it('creates a new brand on createElement', fakeAsync(() => {
    instance.allBrands = TestData.brands.results;
    const brandsResult = TestData.brands.results;
    brandsResult.push(TestData.brand);
    spyOn(instance.itemPropertyData, 'addBrand').and.callThrough();
    spyOn(instance, 'assignElement');
    instance.createElement(ItemProperties.brand, TestData.brand.name);
    tick();
    expect(instance.itemPropertyData.addBrand).toHaveBeenCalledWith(TestData.brand.name);
    expect(instance.allBrands).toEqual(brandsResult);
    expect(instance.assignElement).toHaveBeenCalledWith(ItemProperties.brand, TestData.brand);
  }));

  it('creates a new model on createElement', fakeAsync(() => {
    instance.allModels = TestData.models.results;
    instance.kitItem = TestData.kitItem;
    const modelsResult = TestData.models.results;
    modelsResult.push(TestData.model);
    const newModel = { name: TestData.model.name, modelID: TestData.model.modelID };
    spyOn(instance.itemPropertyData, 'addModel').and.callThrough();
    spyOn(instance, 'assignElement');
    instance.createElement(ItemProperties.model, TestData.model.name);
    tick();
    expect(instance.itemPropertyData.addModel).toHaveBeenCalledWith(TestData.model.name, TestData.kitItem.brandID);
    expect(instance.allModels).toEqual(modelsResult);
    expect(instance.assignElement).toHaveBeenCalledWith(ItemProperties.model, newModel);
  }));

  it('shows toast if error on createElement with brand', fakeAsync(() => {
    instance.itemPropertyData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.createElement(ItemProperties.brand, TestData.brand.name);
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('shows toast if error on createElement with model', fakeAsync(() => {
    instance.itemPropertyData.resolve = false;
    instance.kitItem = TestData.kitItem;
    spyOn(instance.notifications, 'showToast');
    instance.createElement(ItemProperties.model, TestData.model.name);
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('assigns a brand', () => {
    spyOn(instance, 'filterModels');
    instance.assignElement(ItemProperties.brand, TestData.brand);
    expect(instance.kitItem.brandID).toEqual(TestData.brand.brandID);
    expect(instance.kitItem.brand).toEqual(TestData.brand.name);
    expect(instance.filterModels).toHaveBeenCalled();
  });

  it('assigns a model', () => {
    instance.assignElement(ItemProperties.model, TestData.model);
    expect(instance.kitItem.modelID).toEqual(TestData.model.modelID);
    expect(instance.kitItem.model).toEqual(TestData.model.name);
  });
});
