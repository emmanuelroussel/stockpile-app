import { ComponentFixture, async } from '@angular/core/testing';
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

  it('gets brands and models', () => {
    spyOn(instance.brandsActions, 'fetchBrands');
    spyOn(instance.modelsActions, 'fetchModels');
    instance.ngOnInit();
    expect(instance.brandsActions.fetchBrands).toHaveBeenCalled();
    expect(instance.modelsActions.fetchModels).toHaveBeenCalled();
  });

  it('pops nav onAdd()', () => {
    spyOn(instance.events, 'publish');
    spyOn(instance.navCtrl, 'pop');
    instance.kitItem = TestData.kitItem;
    instance.onAdd();
    expect(instance.events.publish).toHaveBeenCalledWith('kit-item:added', TestData.kitItem);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
  });

  it('creates a modal on presentModal()', () => {
    instance.kitItem = TestData.kitItem;
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onPresentModal(ItemProperties.brand);
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, { type: ItemProperties.brand, brandID: TestData.kitItem.brandID });
  });

  it('returns brand on getNewKitModelProperties', () => {
    const kitItemNewBrand = instance.getNewKitModelProperties(ItemProperties.brand, {
      name: TestData.kitItem.brand,
      brandID: TestData.kitItem.brandID
    });
    expect(kitItemNewBrand).toEqual(TestData.kitItemNewBrand);
  });

  it('returns model on getNewKitModelProperties', () => {
    const kitItemNewModel = instance.getNewKitModelProperties(ItemProperties.model, {
      name: TestData.kitItem.model,
      modelID: TestData.kitItem.modelID
    });
    expect(kitItemNewModel).toEqual(TestData.kitItemNewModel);
  });
});
