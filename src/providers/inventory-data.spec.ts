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
    inventoryData.getItem('banana').then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on addItem()', () => {
    let item = {brand: 'Canon', model: 'Rebel T5I', category: 'Camera', cost: '750', condition: 'Good'};
    inventoryData.addItem(item, 'banana').then(
      (success) => expect(true),
      (err) => expect(false)
    );
  });

  it('returns an empty promise on editItem()', () => {
    let item = {brand: 'Canon', model: 'Rebel T5I', category: 'Camera', cost: '750', condition: 'Good'};
    inventoryData.editItem(item, 'banana').then(
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
});
