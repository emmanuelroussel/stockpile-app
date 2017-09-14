import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, ItemProperties, LoadingMessages } from '../../constants';

import { EditFieldPage } from './edit-field';
import { ItemFilterPage } from '../item-filter/item-filter';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<EditFieldPage> = null;
let instance: any = null;

describe('EditField Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([EditFieldPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  const updateForm = (name: string) => {
    instance.fieldForm.controls['name'].setValue(name);
  }

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('gets navParam type', () => {
    instance.navParams.param = ItemProperties.brand;
    instance.ngOnInit();
    expect(instance.type).toEqual(ItemProperties.brand);
  });

  it('gets navParam action', () => {
    instance.navParams.param = Actions.add;
    instance.ngOnInit();
    expect(instance.action).toEqual(Actions.add);
  });

  it('gets navParam field if action is edit', () => {
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    expect(instance.field).toEqual(Actions.edit);
  });

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(TestData.brand.name);
    expect(instance.fieldForm.value).toEqual({
      name: TestData.brand.name
    });
  });

  it('validates name', () => {
    instance.ngOnInit();
    updateForm('');
    expect(instance.fieldForm.controls.name.valid).toEqual(false);
    updateForm(TestData.brand.name);
    expect(instance.fieldForm.controls.name.valid).toEqual(true);
  });

  it('sets blur to true onSave()', () => {
    instance.fieldForm = { valid: false };
    instance.onSave();
    expect(instance.blur.name).toEqual(true);
  });

  it('creates brand if action is add', () => {
    instance.fieldForm = {
      value: { name: TestData.brand.name },
      valid: true
    };
    instance.action = Actions.add;
    instance.type = ItemProperties.brand;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.brandsActions, 'createBrand');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingBrand);
    expect(instance.brandsActions.createBrand).toHaveBeenCalledWith(TestData.brand.name, true);
  });

  it('creates model if action is add', () => {
    instance.fieldForm = {
      value: { name: TestData.model.name },
      valid: true
    };
    instance.action = Actions.add;
    instance.type = ItemProperties.model;
    instance.field = TestData.model;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.modelsActions, 'createModel');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingModel);
    expect(instance.modelsActions.createModel).toHaveBeenCalledWith(TestData.model.name, TestData.model.brandID, true);
  });

  it('creates category if action is add', () => {
    instance.fieldForm = {
      value: { name: TestData.category.name },
      valid: true
    };
    instance.action = Actions.add;
    instance.type = ItemProperties.category;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.categoriesActions, 'createCategory');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingCategory);
    expect(instance.categoriesActions.createCategory).toHaveBeenCalledWith(TestData.category.name, true);
  });

  it('updates brand if action is edit', () => {
    instance.fieldForm = {
      value: TestData.brand,
      valid: true
    };
    instance.action = Actions.edit;
    instance.type = ItemProperties.brand;
    instance.field = TestData.brand;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.brandsActions, 'updateBrand');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingBrand);
    expect(instance.brandsActions.updateBrand).toHaveBeenCalledWith({
      name: TestData.brand.name,
      brandID: TestData.brand.brandID
    });
  });

  it('updates model if action is edit', () => {
    instance.fieldForm = {
      value: TestData.model,
      valid: true
    };
    instance.action = Actions.edit;
    instance.type = ItemProperties.model;
    instance.field = TestData.model;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.modelsActions, 'updateModel');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingModel);
    expect(instance.modelsActions.updateModel).toHaveBeenCalledWith({
      modelID: TestData.model.modelID,
      name: TestData.model.name,
      brandID: TestData.model.brandID
    });
  });

  it('updates category if action is edit', () => {
    instance.fieldForm = {
      value: TestData.category,
      valid: true
    };
    instance.action = Actions.edit;
    instance.type = ItemProperties.category;
    instance.field = TestData.category;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.categoriesActions, 'updateCategory');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingCategory);
    expect(instance.categoriesActions.updateCategory).toHaveBeenCalledWith({
      name: TestData.category.name,
      categoryID: TestData.category.categoryID
    });
  });

  it('does not update field if form is invalid', () => {
    instance.fieldForm = {
      valid: false
    };
    instance.action = Actions.edit;
    instance.type = ItemProperties.category;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.categoriesActions, 'updateCategory');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).not.toHaveBeenCalledWith();
    expect(instance.categoriesActions.updateCategory).not.toHaveBeenCalled();
  });

  it('does not update model if there is a brand error', () => {
    instance.fieldForm = {
      valid: true
    };
    instance.errors.brand = true;
    instance.action = Actions.edit;
    instance.type = ItemProperties.category;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.categoriesActions, 'updateCategory');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).not.toHaveBeenCalledWith();
    expect(instance.categoriesActions.updateCategory).not.toHaveBeenCalled();
  });

  it('creates an alert onDelete()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onDelete();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('deletes brand on deleteField()', () => {
    instance.type = ItemProperties.brand;
    instance.field = TestData.brand;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.brandsActions, 'deleteBrand');
    instance.deleteField();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingBrand);
    expect(instance.brandsActions.deleteBrand).toHaveBeenCalledWith(TestData.brand.brandID);
  });

  it('deletes model on deleteField()', () => {
    instance.type = ItemProperties.model;
    instance.field = TestData.model;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.modelsActions, 'deleteModel');
    instance.deleteField();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingModel);
    expect(instance.modelsActions.deleteModel).toHaveBeenCalledWith(TestData.model.modelID);
  });

  it('deletes category on deleteField()', () => {
    instance.type = ItemProperties.category;
    instance.field = TestData.category;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.categoriesActions, 'deleteCategory');
    instance.deleteField();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingCategory);
    expect(instance.categoriesActions.deleteCategory).toHaveBeenCalledWith(TestData.category.categoryID);
  });

  it('creates a modal on onSelectBrand()', () => {
    spyOn(instance.brandsActions, 'fetchBrands');
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onSelectBrand(ItemProperties.brand);
    expect(instance.brandsActions.fetchBrands).toHaveBeenCalled();
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, { type: ItemProperties.brand });
  });

  it('updates field on updateModel()', () => {
    const field = {
      name: TestData.model.name,
      modelID: TestData.model.modelID
    };
    instance.field = field;
    const newField = {
      ...field,
      brand: TestData.brand.name,
      brandID: TestData.brand.brandID
    }

    instance.updateModel(TestData.brand);
    expect(instance.field).toEqual(newField);
  });

  it('gets name', () => {
    instance.fieldForm = {
      get: (key: string) => TestData.model[key]
    };
    expect(instance.name).toEqual(TestData.model.name);
  });
});
