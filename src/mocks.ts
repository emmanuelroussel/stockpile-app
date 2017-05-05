/* tslint:disable */
// This file contains all the mocks of ionic components required for testing

// IONIC:

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TestData } from './test-data';

export class ApiUrlMock {
  public getUrl(): string {
    return TestData.url;
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

  public setTransition(): void {
    return;
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

  public remove(): any {
    return Promise.resolve();
  }

  public indexOf(): any {
    return Promise.resolve();
  }

  public getPrevious(): any {
    return Promise.resolve();
  }
}

export class PlatformMock {
  currPlatform: string = 'core';

  public ready(): Promise<String> {
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
  stored = TestData.token;

  public get(): any {
    return Promise.resolve(this.stored);
  }

  public set(): any {
    return Promise.resolve();
  }

  public remove(): any {
    return Promise.resolve();
  }
}

export class SplashScreenMock {
  public hide(): any { }
}

export class StatusBarMock {
  public styleDefault(): any { }
}

export class BarcodeScannerMock {
  resolve: boolean = true;
  cancel: boolean = false;

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

export class ToastMock {
  public showWithOptions(): any {
    return Observable.fromPromise(Promise.resolve());
  }
}

export class ModalMock {
  public create(): any {
    return new ModalMock;
  }

  public onDidDismiss(): any {}

  public present(): any {}
}

export class LoadingMock {
  public create(): any {
    return new LoadingMock;
  }

  public dismiss(): any {}

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

export class ItemDataMock {
  allItems = TestData.items;
  item = TestData.apiItem;
  resolve: boolean = true;

  public addItem(): any {
    return returnObservable(this.resolve, this.item);
  }

  public getItem(): any {
    return returnObservable(this.resolve, this.item);
  }

  public editItem(): any {
    return returnObservable(this.resolve, this.item);
  }

  public deleteItem(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public filterItems(): any {
    return returnObservable(this.resolve, this.allItems);
  }

  public rent(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public return(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public getActiveRental(): any {
    return returnObservable(this.resolve, TestData.item);
  }
}

export class ItemPropertyDataMock {
  brands = TestData.brands;
  brand = TestData.brand;
  models = TestData.models;
  model = TestData.model;
  categories = TestData.categories;
  category = TestData.category;
  resolve: boolean = true;

  public getBrands(): any {
    return returnObservable(this.resolve, this.brands);
  }

  public getModels(): any {
    return returnObservable(this.resolve, this.models);
  }

  public getCategories(): any {
    return returnObservable(this.resolve, this.categories);
  }

  public addBrand(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public addModel(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public addCategory(): any {
    return returnObservable(this.resolve, TestData.response);
  }
}

export class KitDataMock {
  kits = TestData.kits;
  kitItems = TestData.kitItems;
  resolve: boolean = true;

  public getKits() {
    return returnObservable(this.resolve, this.kits);
  }

  public getKitItems() {
    return returnObservable(this.resolve, this.kitItems);
  }

  public addKitItem() {
    return returnObservable(this.resolve, TestData.response);
  }

  public deleteKitItem() {
    return returnObservable(this.resolve, TestData.response);
  }

  public addKit() {
    return returnObservable(this.resolve, TestData.response);
  }

  public editKit() {
    return returnObservable(this.resolve, TestData.response);
  }

  public deleteKit() {
    return returnObservable(this.resolve, TestData.response);
  }
}

export class NotificationsMock {
  public showToast(): any { }
}

export class UserDataMock {
  resolve: boolean = true;
  loggedIn: boolean;
  user = TestData.user;
  organization = TestData.organization;

  public login(): any {
    return returnPromise(this.resolve);
  }

  public logout(): any { }

  public isLoggedIn(): any {
    return returnPromise(this.resolve, this.loggedIn);
  }

  public setUser(): any {
    return returnPromise(this.resolve);
  }

  public getUser(): any {
    return returnObservable(this.resolve, this.user);
  }

  public changePassword(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public getOrganization(): any {
    return returnObservable(this.resolve, this.organization);
  }

  public editUser(): any {
    return returnObservable(this.resolve, this.user);
  }
}

export class ApiMock {
  value = TestData.response;

  public get(): any {
    return Observable.fromPromise(Promise.resolve(this.value));
  }

  public put(): any {
    return Observable.fromPromise(Promise.resolve(this.value));
  }

  public delete(): any {
    return Observable.fromPromise(Promise.resolve(this.value));
  }
}

export function returnObservable(resolve: boolean, value?: any): any {
  if (resolve) {
    return Observable.fromPromise(Promise.resolve(value));
  } else {
    return Observable.fromPromise(Promise.reject(TestData.error));
  }
}

export function returnPromise(resolve: boolean, value?: any): any {
  if (resolve) {
    return Promise.resolve(value);
  } else {
    return Promise.reject(TestData.error);
  }
}

/* tslint:enable */
