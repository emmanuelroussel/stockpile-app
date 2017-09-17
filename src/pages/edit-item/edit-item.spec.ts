import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, ItemProperties, LoadingMessages } from '../../constants';

import { EditItemPage } from './edit-item';
import { ItemFilterPage } from '../item-filter/item-filter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let fixture: ComponentFixture<EditItemPage> = null;
let instance: any = null;

describe('EditItem Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([EditItemPage]).then(compiled => {
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

  it('gets brands, models and categories', () => {
    spyOn(instance.brandsActions, 'fetchBrands');
    spyOn(instance.modelsActions, 'fetchModels');
    spyOn(instance.categoriesActions, 'fetchCategories');
    instance.ngOnInit();
    expect(instance.brandsActions.fetchBrands).toHaveBeenCalled();
    expect(instance.modelsActions.fetchModels).toHaveBeenCalled();
    expect(instance.categoriesActions.fetchCategories).toHaveBeenCalled();
  });

  it('gets temp item', () => {
    instance.ngOnInit();
    instance.tempItem.take(1).subscribe(item => expect(item).toEqual(TestData.apiItem));
  });

  it('updates barcode if action is add', () => {
    instance.navParams.param = Actions.add;
    spyOn(instance.itemsActions, 'updateTempItem');
    instance.ngOnInit();
    expect(instance.itemsActions.updateTempItem).toHaveBeenCalled();
  });

  it('updates temp item if action is edit', () => {
    instance.navParams.param = Actions.edit;
    spyOn(instance.itemsActions, 'updateTempItem');
    instance.ngOnInit();
    expect(instance.itemsActions.updateTempItem).toHaveBeenCalledWith(TestData.tempItem);
  });

  it('creates item onSave() if action is add', () => {
    instance.action = Actions.add;
    instance.tempItem = Observable.of(TestData.apiItem);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'createItem');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingItem);
    expect(instance.itemsActions.createItem).toHaveBeenCalledWith(TestData.item);
  });

  it('updates item onSave() if action is edit', () => {
    instance.action = Actions.edit;
    instance.tempItem = Observable.of(TestData.apiItem);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'updateItem');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingItem);
    expect(instance.itemsActions.updateItem).toHaveBeenCalledWith(TestData.item);
  });

  it('does not update item onSave() if there are errors', () => {
    instance.action = Actions.edit;
    instance.tempItem = Observable.of({
      brand: TestData.apiItem.brand
    });
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'updateItem');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).not.toHaveBeenCalled();
    expect(instance.itemsActions.updateItem).not.toHaveBeenCalled();
  });

  it('updates errors on checkIfErrors()', () => {
    instance.tempItem = Observable.of({
      brand: TestData.apiItem.brand,
      model: TestData.apiItem.model
    });
    instance.checkIfErrors();
    expect(instance.errors).toEqual({
      brand: false,
      model: false,
      category: true
    });
  });

  it('creates an alert onDelete()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onDelete();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('deletes item on deleteItem()', () => {
    instance.tempItem = Observable.of(TestData.apiItem);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'deleteItem');
    instance.deleteItem();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingItem);
    expect(instance.itemsActions.deleteItem).toHaveBeenCalledWith(TestData.apiItem.barcode);
  });

  it('creates a modal on presentModal()', () => {
    instance.tempItem = Observable.of(TestData.apiItem);
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onPresentModal(ItemProperties.brand);
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, { type: ItemProperties.brand, brandID: TestData.apiItem.brandID });
  });

  it('updates temp item on updateTempItem with brand', () => {
    const brand = {
      name: TestData.apiItem.brand,
      brandID: TestData.apiItem.brandID
    };
    spyOn(instance.itemsActions, 'updateTempItem');
    instance.updateTempItem(ItemProperties.brand, brand);
    expect(instance.itemsActions.updateTempItem).toHaveBeenCalledWith({
      brand: TestData.apiItem.brand,
      brandID: TestData.apiItem.brandID,
      model: '',
      modelID: null
    });
  });

  it('updates temp item on updateTempItem with model', () => {
    const model = {
      name: TestData.apiItem.model,
      modelID: TestData.apiItem.modelID
    };
    spyOn(instance.itemsActions, 'updateTempItem');
    instance.updateTempItem(ItemProperties.model, model);
    expect(instance.itemsActions.updateTempItem).toHaveBeenCalledWith({
      model: TestData.apiItem.model,
      modelID: TestData.apiItem.modelID
    });
  });

  it('updates temp item on updateTempItem with categories', () => {
    const category = {
      name: TestData.apiItem.category,
      categoryID: TestData.apiItem.categoryID
    };
    spyOn(instance.itemsActions, 'updateTempItem');
    instance.updateTempItem(ItemProperties.category, category);
    expect(instance.itemsActions.updateTempItem).toHaveBeenCalledWith({
      category: TestData.apiItem.category,
      categoryID: TestData.apiItem.categoryID
    });
  });
});
