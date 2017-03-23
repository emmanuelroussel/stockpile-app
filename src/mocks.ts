/* tslint:disable */
// This file contains all the mocks of ionic components required for testing

// IONIC:

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TestData } from './test-data';

export class ApiUrlMock {
  public getUrl(): string {
    return '';
  }
}

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
  currPlatform: string = 'core';

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

export class PlatformMockIsCordova {
  public is(platform: string): Boolean {
    return platform === 'cordova'
  }
}

export class PlatformMockIsCore {
  public is(platform: string): Boolean {
    return platform === 'core'
  }
}

export class MenuMock {
  public close(): any {
    return Promise.resolve();
  }
}

export class NavParamsMock {
  param: any;

  public get(): any {
    return this.param;
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

export class ModalMock {
  public create(): any {
    return new ModalMock;
  }

  public onDidDismiss(): any {}

  public present(): any {}
}

export class ViewMock {
  public dismiss(): any {}
}

export class AlertMock {
  public create(): any {
    return new AlertMock();
  }

  public present(): any {}
}

export class NavigatorMock {
  hal = {};

  public get(): any {
    return Observable.fromPromise(Promise.resolve(this.hal));
  }
}

export class InventoryDataMock {
  allItems = TestData.items;
  item = TestData.apiItem;
  brands = TestData.brands;
  models = TestData.models;
  categories = TestData.categories;
  status = TestData.status;
  resolve: boolean = true;

  public addItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.item));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getAllItems(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.allItems));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.item));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public editItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.item));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public deleteItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public filterItems(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.allItems));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public rent(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public return(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getBrands(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.brands));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getModels(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.models));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getCategories(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.categories));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getStatus(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.status));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }
}

export class IonicPluginsMock {
  resolve: boolean = true;
  cancel: boolean = false;

  public getUrl(): any { }

  public showToast(): any { }

  public scan(): any {
    if (this.resolve) {
      if (this.cancel) {
        return Promise.resolve(TestData.barcodeDataCancelled);
      } else {
        return Promise.resolve(TestData.barcodeData);
      }
    } else {
      return Promise.reject(TestData.error);
    }
  }
}

export class UserDataMock {
  resolve: boolean = true;
  loggedIn: boolean;

  public login(): any {
    if (this.resolve) {
      return Promise.resolve();
    } else {
      return Promise.reject(TestData.error);
    }
  }

  public logout(): any { }

  public isLoggedIn(): any {
    return Promise.resolve(this.loggedIn);
  }

  public setUser(): any { }
}

/* tslint:enable */
