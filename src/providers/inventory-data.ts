import { Injectable } from '@angular/core';
import { TestData } from '../test-data';

@Injectable()
export class InventoryData {

  constructor() { }

  getItem(tag: string) {
    return Promise.resolve(TestData.item);
  }

  addItem(item: Object, tag: string) {
    return Promise.resolve();
  }

  editItem(item: Object, tag: string) {
    return Promise.resolve();
  }

  deleteItem(tag: string) {
    return Promise.resolve();
  }

  rent(items: Array<Object>, details: Object) {
    return Promise.resolve();
  }

  return(items: Array<Object>) {
    return Promise.resolve();
  }

  getConditions() {
    return Promise.resolve(TestData.conditions);
  }

  getCategories() {
    return Promise.resolve(TestData.categories);
  }
}
