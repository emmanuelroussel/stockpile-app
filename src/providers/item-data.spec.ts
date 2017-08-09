import { ItemData } from './item-data';
import { TestData } from '../test-data';
import { ApiMock } from '../mocks';

let instance: ItemData = null;

describe('ItemData Provider', () => {

  beforeEach(() => {
    instance = new ItemData((<any> new ApiMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('calls api to get item', () => {
    instance.api.value = TestData.item;
    instance.getItem(TestData.barcode).subscribe(
      res => expect(res).toEqual(TestData.item),
      err => fail(err)
    );
  });

  it('calls api to create item', () => {
    instance.api.value = TestData.response;
    instance.createItem(TestData.item).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to update item', () => {
    instance.api.value = TestData.response;
    instance.updateItem(TestData.item, TestData.item.barcode).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to delete item', () => {
    instance.api.value = TestData.response;
    instance.deleteItem(TestData.barcode).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to filter items', () => {
    instance.api.value = TestData.items;
    instance.filterItems(
      TestData.apiItem.brandID,
      TestData.apiItem.modelID,
      TestData.apiItem.categoryID,
      TestData.apiItem.available,
      TestData.limit,
      TestData.offset)
    .subscribe(
      res => expect(res).toEqual(TestData.items),
      err => fail(err)
    );
  });

  it('calls api to rent item', () => {
    instance.api.value = TestData.response;
    instance.rent(TestData.details).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to return item', () => {
    instance.api.value = TestData.response;
    instance.return(TestData.barcode).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });

  it('calls api to get active rental of item', () => {
    instance.api.value = TestData.response;
    instance.getActiveRental(TestData.barcode).subscribe(
      res => expect(res).toEqual(TestData.response),
      err => fail(err)
    );
  });
});
