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

export class InventoryDataMock {
  allItems = TestData.items;
  item = TestData.apiItem;
  brands = TestData.brands;
  brand = TestData.brand;
  models = TestData.models;
  model = TestData.model;
  categories = TestData.categories;
  category = TestData.category;
  status = TestData.status;
  resolve: boolean = true;

  public addItem(): any {
    return this.returnValue(this.item);
  }

  public getAllItems(): any {
    return this.returnValue(this.allItems);
  }

  public getItem(): any {
    return this.returnValue(this.item);
  }

  public editItem(): any {
    return this.returnValue(this.item);
  }

  public deleteItem(): any {
    return this.returnValue();
  }

  public filterItems(): any {
    return this.returnValue(this.allItems);
  }

  public rent(): any {
    return this.returnValue();
  }

  public return(): any {
    return this.returnValue();
  }

  public getBrands(): any {
    return this.returnValue(this.brands);
  }

  public getModels(): any {
    return this.returnValue(this.models);
  }

  public getCategories(): any {
    return this.returnValue(this.categories);
  }

  public getStatus(): any {
    return this.returnValue(this.status);
  }

  public addBrand(): any {
    return this.returnValue(TestData.response);
  }

  public addModel(): any {
    return this.returnValue(TestData.response);
  }

  public addCategory(): any {
    return this.returnValue(TestData.response);
  }

  private returnValue(value?: any): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(value));
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
