/* tslint:disable */
// This file contains all the mocks of ionic components required for testing

// IONIC:

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TestData } from './test-data';

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
    return Promise.resolve();
  }

  public push(): any {
    return Promise.resolve();
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

  public popToRoot(): any {
    return Promise.resolve();
  }
}

export class PlatformMock {
  public ready(): Promise<{String}> {
    return Promise.resolve('READY');
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
    return Promise.resolve();
  }
}

export class NavParamsMock {
  param: string = '';

  public get(): any {
    return String(this.param);
  }
}

export class StorageMock {
  public get(): any {
    return Promise.resolve();
  }

  public set(): any {
    return Promise.resolve();
  }
}

export class NavigatorMock {
  hal = {};

  public get(): any {
    return Observable.fromPromise(Promise.resolve(this.hal));
  }
}

export class InventoryDataMock {
  item: {brand?: string, model?: string, category?: string, cost?: string, condition?: string} = TestData.item;
  conditions = TestData.conditions;
  categories = TestData.categories;

  public addItem(): any {
    return Observable.fromPromise(Promise.resolve());
  }

  public getItem(): any {
    return Observable.fromPromise(Promise.resolve(this.item));
  }

  public editItem(): any {
    return Observable.fromPromise(Promise.resolve());
  }

  public deleteItem(): any {
    return Observable.fromPromise(Promise.resolve());
  }

  public rent(): any {
    return Observable.fromPromise(Promise.resolve());
  }

  public return(): any {
    return Observable.fromPromise(Promise.resolve());
  }

  public getConditions(): any {
    return Observable.fromPromise(Promise.resolve(this.conditions));
  }

  public getCategories(): any {
    return Observable.fromPromise(Promise.resolve(this.categories));
  }
}

export class StockpileDataMock {
  public initHal(): any {
    return Promise.resolve();
  }

  public getUrl(): any { }
}

export class UserDataMock {
  resolve: boolean;
  loggedIn: boolean;

  public login(): any {
    return new Promise((resolve, reject) => {
      if (this.resolve) {
        resolve();
      } else {
        reject();
      }
    });
  }

  public logout(): any { }

  public isLoggedIn(): any {
    return Promise.resolve(this.loggedIn);
  }
}

/* tslint:enable */
