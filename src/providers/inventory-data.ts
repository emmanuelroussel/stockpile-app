import { Injectable } from '@angular/core';

@Injectable()
export class InventoryData {

  constructor() { }

  addItem(item: Object, tag: string) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
