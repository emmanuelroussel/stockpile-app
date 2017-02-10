/* tslint:disable */
// This file contains all the mocks of ionic components required for testing

// IONIC:

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): Promise<{String}> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class NavParamsMock {
  param: string = '';

  public get(): any {
    return String(this.param);
  }
}

export class NavigatorMock {
  hal = {};

  public get(): any {
    let promise = new Promise((resolve, reject) => {
      resolve(this.hal);
    });

    return Observable.fromPromise(promise);
  }
}

export class InventoryDataMock {
  item: {brand?: string, model?: string, category?: string, cost?: string, condition?: string} = {brand: 'Canon', model: 'Rebel T5i', category: 'Camera', cost: '750', condition: 'Good'};

  public addItem(): any {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public getItem(): any {
    return new Promise((resolve, reject) => {
      resolve(this.item);
    });
  }

  public editItem(): any {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public deleteItem(): any {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class StockpileDataMock {
  public initHal(): any { }
}

export class UserDataMock {
  public login(): any {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

/* tslint:enable */
