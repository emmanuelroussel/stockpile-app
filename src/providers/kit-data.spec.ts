import { KitData } from './kit-data';
import { TestData } from '../test-data';
import { ApiMock } from '../mocks';

let instance: KitData = null;

describe('KitData Provider', () => {

  beforeEach(() => {
    instance = new KitData((<any> new ApiMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('calls api to get a kit', () => {
    instance.api.value = TestData.kit;
    instance.getKit(TestData.kit.kitID).subscribe(
      res => expect(res).toEqual(TestData.kit),
      err => fail(err)
    );
  });

  it('calls api to get kits', () => {
    instance.api.value = TestData.kits;
    instance.getKits(TestData.limit, TestData.offset).subscribe(
      res => expect(res).toEqual(TestData.kits),
      err => fail(err)
    );
  });

  it('calls api to get kit', () => {
    instance.api.value = TestData.kit;
    instance.getKits(TestData.kit.kitID).subscribe(
      res => expect(res).toEqual(TestData.kit),
      err => fail(err)
    );
  });

  it('calls api to get kit item', () => {
    instance.api.value = TestData.kitModels;
    instance.getKitModels().subscribe(
      res => expect(res).toEqual(TestData.kitModels),
      err => fail(err)
    );
  });

  it('calls api to add kit item', () => {
    instance.api.value = TestData.kitModel;
    instance.addKitModel(TestData.kit.kitID, TestData.kitModel.modelID).subscribe(
      res => expect(res).toEqual(TestData.kitModel),
      err => fail(err)
    );
  });

  it('calls api to delete kit item', () => {
    instance.api.value = TestData.response;
    instance.deleteKitModel(TestData.kit.kitID, TestData.kitModel.modelID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to create kit', () => {
    instance.api.value = TestData.response;
    instance.createKit(TestData.kit.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to update kit', () => {
    instance.api.value = TestData.response;
    instance.updateKit(TestData.kit).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to delete kit', () => {
    instance.api.value = TestData.response;
    instance.deleteKit(TestData.kit.kitID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });
});
