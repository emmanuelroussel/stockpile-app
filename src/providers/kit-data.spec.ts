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
    instance.api.value = TestData.kitItems;
    instance.getKitItems().subscribe(
      res => expect(res).toEqual(TestData.kitItems),
      err => fail(err)
    );
  });

  it('calls api to add kit item', () => {
    instance.api.value = TestData.kitItem;
    instance.addKitItem(TestData.kit.kitID, TestData.kitItem.modelID).subscribe(
      res => expect(res).toEqual(TestData.kitItem),
      err => fail(err)
    );
  });

  it('calls api to delete kit item', () => {
    instance.api.value = TestData.response;
    instance.deleteKitItem(TestData.kit.kitID, TestData.kitItem.modelID).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to add kit', () => {
    instance.api.value = TestData.response;
    instance.addKit(TestData.kit.name).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to edit kit', () => {
    instance.api.value = TestData.response;
    instance.editKit(TestData.kit).subscribe(
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
