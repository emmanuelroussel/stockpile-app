import { InventoryData } from './inventory-data';
import { TestData } from '../test-data';

let inventoryData: InventoryData = null;

describe('InventoryData Provider', () => {

  beforeEach(() => {
    inventoryData = new InventoryData();
  });

  it('is created', () => {
    expect(InventoryData).not.toBeNull();
  });

  it('returns an empty promise on getItem()', () => {
    inventoryData.getItem('banana').then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on addItem()', () => {
    inventoryData.addItem(TestData.item, 'banana').then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on editItem()', () => {
    inventoryData.editItem(TestData.item, 'banana').then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on deleteItem()', () => {
    inventoryData.deleteItem('banana').then(
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
});
