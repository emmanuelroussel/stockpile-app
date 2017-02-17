import { Injectable } from '@angular/core';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class InventoryData {

  constructor() { }

  getItem(tag: string) {
    return Observable.fromPromise(Promise.resolve(TestData.item));
  }

  addItem(item: Object, tag: string) {
    return Observable.fromPromise(Promise.resolve());
  }

  editItem(item: Object, tag: string) {
    return Observable.fromPromise(Promise.resolve());
  }

  deleteItem(tag: string) {
    return Observable.fromPromise(Promise.resolve());
  }

  rent(items: Array<Object>, details: Object) {
    return Observable.fromPromise(Promise.resolve());
  }

  return(items: Array<Object>) {
    return Observable.fromPromise(Promise.resolve());
  }

  getConditions() {
    return Observable.fromPromise(Promise.resolve(TestData.conditions));
  }

  getCategories() {
    return Observable.fromPromise(Promise.resolve(TestData.categories));
  }
}
