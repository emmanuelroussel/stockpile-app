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
    inventoryData.getItem(TestData.item.tag).subscribe(
      item => expect(item).toEqual(TestData.item),
      err => expect(false)
    );
  });

  it('returns an empty promise on addItem()', () => {
    inventoryData.addItem(TestData.item, TestData.item.tag).subscribe(
      success => expect(true),
      err => expect(false)
    );
  });

  it('returns an empty promise on editItem()', () => {
    inventoryData.editItem(TestData.item, TestData.item.tag).subscribe(
      success => expect(true),
      err => expect(false)
    );
  });

  it('returns an empty promise on deleteItem()', () => {
    inventoryData.deleteItem(TestData.item.tag).subscribe(
      success => expect(true),
      err => expect(false)
    );
  });

  it('returns an empty promise on rent()', () => {
    inventoryData.rent(TestData.items, TestData.details).subscribe(
      success => expect(true),
      err => expect(false)
    );
  });

  it('returns an empty promise on return()', () => {
    inventoryData.return(TestData.items).subscribe(
      success => expect(true),
      err => expect(false)
    );
  });

  it('returns categories on getCategories()', () => {
    inventoryData.getCategories().subscribe(
      categories => expect(categories).toEqual(TestData.categories),
      err => expect(false)
    );
  });

  it('returns conditions on getConditions()', () => {
    inventoryData.getConditions().subscribe(
      conditions => expect(conditions).toEqual(TestData.conditions),
      err => expect(false)
    );
  });
});
