import { Injectable } from '@angular/core';
import { TestData } from '../test-data';

@Injectable()
export class InventoryData {

  constructor() { }

  getItem(tag: string) {
    return new Promise((resolve, reject) => {
      resolve(TestData.item);
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

  return(items: Array<Object>) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  getConditions() {
    return new Promise((resolve, reject) => {
      resolve(TestData.conditions);
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      resolve(TestData.categories);
    });
  }
}
