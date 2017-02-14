import { TestData } from '../test-data';

import { InventoryData } from './inventory-data';

let inventoryData: InventoryData = null;

describe('InventoryData Provider', () => {

  beforeEach(() => {
    inventoryData = new InventoryData();
  });

  it('is created', () => {
    expect(InventoryData).not.toBeNull();
  });

  it('returns an empty promise on getItem()', () => {
    inventoryData.getItem(TestData.item.tag).then(
      item => expect(item).toEqual(TestData.item),
      err => expect(false)
    );
  });

  it('returns an empty promise on addItem()', () => {
    inventoryData.addItem(TestData.item, TestData.item.tag).then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on editItem()', () => {
    inventoryData.editItem(TestData.item, TestData.item.tag).then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on deleteItem()', () => {
    inventoryData.deleteItem(TestData.item.tag).then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on rent()', () => {
    inventoryData.rent(TestData.items, TestData.details).then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on return()', () => {
    inventoryData.return(TestData.items).then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns categories on getCategories()', () => {
    inventoryData.getCategories().then(
      categories => expect(categories).toEqual(TestData.categories),
      err => expect(false)
    );
  });

  it('returns conditions on getConditions()', () => {
    inventoryData.getConditions().then(
      conditions => expect(conditions).toEqual(TestData.conditions),
      err => expect(false)
    );
  });
});
