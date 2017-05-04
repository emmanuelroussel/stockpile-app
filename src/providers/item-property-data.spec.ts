import { ItemPropertyData } from './item-property-data';
import { TestData } from '../test-data';
import { ApiMock } from '../mocks';

let instance: ItemPropertyData = null;

describe('KitData Provider', () => {

  beforeEach(() => {
    instance = new ItemPropertyData((<any> new ApiMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('calls api to get brands', () => {
    instance.api.value = TestData.brands.results;
    instance.getBrands().subscribe(
      res => expect(res).toEqual(TestData.brands.results),
      err => fail(err)
    );
  });

  it('calls api to add brand', () => {
    instance.api.value = TestData.response;
    instance.addBrand(TestData.brand.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to get models', () => {
    instance.api.value = TestData.models.results;
    instance.getModels().subscribe(
      res => expect(res).toEqual(TestData.models.results),
      err => fail(err)
    );
  });

  it('calls api to add model', () => {
    instance.api.value = TestData.response;
    instance.addModel(TestData.model.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to get categories', () => {
    instance.api.value = TestData.categories.results;
    instance.getCategories().subscribe(
      res => expect(res).toEqual(TestData.categories.results),
      err => fail(err)
    );
  });

  it('calls api to add category', () => {
    instance.api.value = TestData.response;
    instance.addCategory(TestData.category.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });
});
