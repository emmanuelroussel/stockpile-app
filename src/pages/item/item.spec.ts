import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, ItemProperties, Messages } from '../../constants';

import { ItemPage } from './item';
import { ItemFilterPage } from '../item-filter/item-filter';

let fixture: ComponentFixture<ItemPage> = null;
let instance: any = null;

describe('Item Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ItemPage]).then(compiled => {
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

  it('gets navParam tag', () => {
    instance.navParams.param = TestData.item.tag;
    instance.ngOnInit();
    expect(instance.item.tag).toEqual(TestData.item.tag);
  });

  it('gets navParam action', () => {
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    expect(instance.action).toEqual(Actions.edit);
  });

  it('gets item if action === \'Edit\'', fakeAsync(() => {
    instance.inventoryData.item = TestData.apiItem;
    instance.navParams.param = Actions.edit;
    spyOn(instance, 'filterModels');
    instance.ngOnInit();
    tick();
    expect(instance.item).toEqual(TestData.item);
    expect(instance.selectedBrand).toEqual(TestData.apiItem.brand);
    expect(instance.selectedModel).toEqual(TestData.apiItem.model);
    expect(instance.selectedCategory).toEqual(TestData.apiItem.category);
    expect(instance.filterModels).toHaveBeenCalled();
  }));

  it('gets brands, models and categories', fakeAsync(() => {
    instance.inventoryData.brands = TestData.brands;
    instance.inventoryData.models = TestData.models;
    instance.inventoryData.categories = TestData.categories;
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    tick();
    expect(instance.allBrands).toEqual(TestData.brands.results);
    expect(instance.allModels).toEqual(TestData.models.results);
    expect(instance.allCategories).toEqual(TestData.categories.results);
  }));

  it('shows toast if error while getting item, brands, models and categories', fakeAsync(() => {
    instance.navParams.param = Actions.edit;
    instance.inventoryData.resolve = false;
    spyOn(instance.ionicPlugins, 'showToast');
    instance.ngOnInit();
    tick();
    expect(instance.ionicPlugins.showToast).toHaveBeenCalledTimes(3);
  }));

  it('calls onSave() on click on save button', () => {
    spyOn(instance, 'onSave');
    TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button[type="submit"]')[0], 'click');
    expect(instance.onSave).toHaveBeenCalled();
  });

  it('pops nav onSave() if form is valid and action is add', fakeAsync(() => {
    instance.item = TestData.item;
    instance.navParams.param = Actions.add;
    instance.ngOnInit();
    spyOn(instance.navCtrl, 'pop');
    spyOn(instance.ionicPlugins, 'showToast');
    spyOn(instance.events, 'publish');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onSave(form);
      tick();
      expect(instance.navCtrl.pop).toHaveBeenCalled();
      expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(Messages.itemAdded);
      expect(instance.events.publish).toHaveBeenCalledWith('item:edited', instance.inventoryData.item.tag);
    });
  }));

  it('pops nav onSave() if form is valid and action is edit', fakeAsync(() => {
    instance.item = TestData.item;
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    spyOn(instance.navCtrl, 'pop');
    spyOn(instance.ionicPlugins, 'showToast');
    spyOn(instance.events, 'publish');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onSave(form);
      tick();
      expect(instance.navCtrl.pop).toHaveBeenCalled();
      expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(Messages.itemEdited);
      expect(instance.events.publish).toHaveBeenCalledWith('item:edited', instance.inventoryData.item.tag);
    });
  }));

  it('shows toast if error onSave()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    instance.navParams.param = Actions.edit;
    spyOn(instance.ionicPlugins, 'showToast');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form: NgForm = fixture.debugElement.children[0].injector.get(NgForm);
      instance.onSave(form);
      tick();
      expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(TestData.error);
    });
  }));

  it('pops nav onDelete()', fakeAsync(() => {
    instance.action = Actions.edit;
    spyOn(instance.navCtrl, 'pop');
    spyOn(instance.ionicPlugins, 'showToast');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onDelete();
      tick();
      expect(instance.navCtrl.pop).toHaveBeenCalled();
      expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(Messages.itemDeleted);
    });
  }));

  it('shows toast if error onDelete()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.ionicPlugins, 'showToast');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      instance.onDelete();
      tick();
      expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(TestData.error);
    });
  }));

  it('creates a modal on presentModal()', () => {
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.presentModal(TestData.brands.results, ItemProperties.brand);
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, { elements: TestData.brands.results, type: ItemProperties.brand });
  });

  it('filter models on filterModels()', () => {
    instance.allModels = TestData.models.results;
    instance.selectedBrandID = TestData.apiItem.brandID;
    instance.filterModels();
    expect(instance.filteredModels).toEqual(TestData.filteredModels);
  });

  it('creates a new brand on createElement', fakeAsync(() => {
    instance.allBrands = TestData.brands.results;
    const brandsResult = TestData.brands.results;
    brandsResult.push(TestData.brand);
    spyOn(instance.inventoryData, 'addBrand').and.callThrough();
    spyOn(instance, 'assignElement');
    instance.createElement(ItemProperties.brand, TestData.brand.name);
    tick();
    expect(instance.inventoryData.addBrand).toHaveBeenCalledWith(TestData.brand.name);
    expect(instance.allBrands).toEqual(brandsResult);
    expect(instance.assignElement).toHaveBeenCalledWith(ItemProperties.brand, TestData.brand);
  }));

  it('creates a new model on createElement', fakeAsync(() => {
    instance.allModels = TestData.models.results;
    instance.selectedBrandID = TestData.brand.brandID;
    const modelsResult = TestData.models.results;
    modelsResult.push(TestData.model);
    const newModel = { name: TestData.model.name, modelID: TestData.model.modelID };
    spyOn(instance.inventoryData, 'addModel').and.callThrough();
    spyOn(instance, 'assignElement');
    instance.createElement(ItemProperties.model, TestData.model.name);
    tick();
    expect(instance.inventoryData.addModel).toHaveBeenCalledWith(TestData.model.name, TestData.brand.brandID);
    expect(instance.allModels).toEqual(modelsResult);
    expect(instance.assignElement).toHaveBeenCalledWith(ItemProperties.model, newModel);
  }));

  it('creates a new category on createElement', fakeAsync(() => {
    instance.allCategories = TestData.categories.results;
    const categoryResult = TestData.categories.results;
    categoryResult.push(TestData.category);
    spyOn(instance.inventoryData, 'addCategory').and.callThrough();
    spyOn(instance, 'assignElement');
    instance.createElement(ItemProperties.category, TestData.category.name);
    tick();
    expect(instance.inventoryData.addCategory).toHaveBeenCalledWith(TestData.category.name);
    expect(instance.allCategories).toEqual(categoryResult);
    expect(instance.assignElement).toHaveBeenCalledWith(ItemProperties.category, TestData.category);
  }));

  it('shows toast if error on createElement with brand', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.ionicPlugins, 'showToast');
    instance.createElement(ItemProperties.brand, TestData.brand.name);
    tick();
    expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('shows toast if error on createElement with model', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.ionicPlugins, 'showToast');
    instance.createElement(ItemProperties.model, TestData.model.name);
    tick();
    expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('shows toast if error on createElement with category', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.ionicPlugins, 'showToast');
    instance.createElement(ItemProperties.category, TestData.category.name);
    tick();
    expect(instance.ionicPlugins.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('assigns a brand', () => {
    spyOn(instance, 'filterModels');
    instance.assignElement(ItemProperties.brand, TestData.brand);
    expect(instance.selectedBrandID).toEqual(TestData.brand.brandID);
    expect(instance.selectedBrand).toEqual(TestData.brand.name);
    expect(instance.filterModels).toHaveBeenCalled();
  });

  it('assigns a model', () => {
    instance.assignElement(ItemProperties.model, TestData.model);
    expect(instance.item.modelID).toEqual(TestData.model.modelID);
    expect(instance.selectedModel).toEqual(TestData.model.name);
  });

  it('assigns a category', () => {
    instance.assignElement(ItemProperties.category, TestData.category);
    expect(instance.item.categoryID).toEqual(TestData.category.categoryID);
    expect(instance.selectedCategory).toEqual(TestData.category.name);
  });
});
