import { Injectable } from '@angular/core';

@Injectable()
export class InventoryData {
  item: {brand?: string, model?: string, category?: string, cost?: string, condition?: string} = {brand: 'Canon', model: 'Rebel T5i', category: 'Camera', cost: '750', condition: 'Good'};

  constructor() { }

  getItem(tag: string) {
    return new Promise((resolve, reject) => {
      resolve(this.item);
    });
  }

  addItem(item: Object, tag: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  editItem(item: Object, tag: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  deleteItem(tag: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
