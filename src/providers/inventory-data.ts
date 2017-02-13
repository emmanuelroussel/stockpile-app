import { Injectable } from '@angular/core';
import { TestData } from '../test-data';

@Injectable()
export class InventoryData {
  item: {tag?: string, brand?: string, model?: string, category?: string, cost?: string, condition?: string} = TestData.item;

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

  rent(items: Array<Object>, details: Object) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
