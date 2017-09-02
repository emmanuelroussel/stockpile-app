import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { ItemProperties } from '../../constants';

import { AddKitModelPage } from './add-kit-model';
import { ItemFilterPage } from '../item-filter/item-filter';

let fixture: ComponentFixture<AddKitModelPage> = null;
let instance: any = null;

describe('AddKitModel Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([AddKitModelPage]).then(compiled => {
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

  it('gets brands and models', () => {
    spyOn(instance.brandsActions, 'fetchBrands');
    spyOn(instance.modelsActions, 'fetchModels');
    instance.ngOnInit();
    expect(instance.brandsActions.fetchBrands).toHaveBeenCalled();
    expect(instance.modelsActions.fetchModels).toHaveBeenCalled();
  });

  it('pops nav onAdd()', () => {
    spyOn(instance.kitModelsActions, 'createTemp');
    spyOn(instance.navCtrl, 'pop');
    instance.kitModel = TestData.kitModel;
    instance.onAdd();
    expect(instance.kitModelsActions.createTemp).toHaveBeenCalledWith(TestData.kitModel);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
  });

  it('creates a modal on presentModal()', () => {
    instance.kitModel = TestData.kitModel;
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onPresentModal(ItemProperties.brand);
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, { type: ItemProperties.brand, brandID: TestData.kitModel.brandID });
  });

  it('returns brand on getNewKitModelProperties', () => {
    const kitModelNewBrand = instance.getNewKitModelProperties(ItemProperties.brand, {
      name: TestData.kitModel.brand,
      brandID: TestData.kitModel.brandID
    });
    expect(kitModelNewBrand).toEqual(TestData.kitModelNewBrand);
  });

  it('returns model on getNewKitModelProperties', () => {
    const kitModelNewModel = instance.getNewKitModelProperties(ItemProperties.model, {
      name: TestData.kitModel.model,
      modelID: TestData.kitModel.modelID
    });
    expect(kitModelNewModel).toEqual(TestData.kitModelNewModel);
  });
});
