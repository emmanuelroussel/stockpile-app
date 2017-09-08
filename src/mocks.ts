/* tslint:disable */
// This file contains all the mocks of ionic components required for testing

// IONIC:

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { TestData } from './test-data';

export class ApiUrlMock {
  public getUrl(): string {
    return TestData.url;
  }
}

export class AppMock {
  public getActiveNav() {
    return new NavMock();
  }

  public getRootNav() {
    return new NavMock();
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

  public registerChildNav(): any {
    return ;
  }
}

export class DeepLinkerMock {

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
    return platform === 'cordova';
  }
}

export class PlatformMockIsCore {
  public is(platform: string): Boolean {
    return platform === 'core';
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
  resolve: boolean = true;

  public get(): any {
    return returnPromise(this.resolve, this.stored);
  }

  public set(): any {
    return returnPromise(this.resolve);
  }

  public remove(): any {
    return returnPromise(this.resolve);
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
    return Observable.of(null);
  }
}

export class InAppBrowserMock {
  public create(): any {}
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

  public createItem(): any {
    return returnObservable(this.resolve, this.item);
  }

  public getItem(): any {
    return returnObservable(this.resolve, this.item);
  }

  public updateItem(): any {
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

  public createBrand(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public createModel(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public createCategory(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public updateBrand(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public updateModel(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public updateCategory(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public deleteBrand(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public deleteModel(): any {
    return returnObservable(this.resolve, TestData.response);
  }

  public deleteCategory(): any {
    return returnObservable(this.resolve, TestData.response);
  }
}

export class KitDataMock {
  kits = TestData.kits;
  kit = TestData.kit;
  kitModels = TestData.kitModels;
  resolve: boolean = true;

  public getKits() {
    return returnObservable(this.resolve, this.kits);
  }

  public getKit() {
    return returnObservable(this.resolve, this.kit);
  }

  public getKitModels() {
    return returnObservable(this.resolve, this.kitModels);
  }

  public addkitModel() {
    return returnObservable(this.resolve, TestData.response);
  }

  public deletekitModel() {
    return returnObservable(this.resolve, TestData.response);
  }

  public createKit() {
    return returnObservable(this.resolve, TestData.kit);
  }

  public updateKit() {
    return returnObservable(this.resolve, TestData.kit);
  }

  public deleteKit() {
    return returnObservable(this.resolve, TestData.response);
  }
}

export class NotificationsMock {
  public showMessage(): any { }
}

export class UserDataMock {
  resolve: boolean = true;
  loggedIn: boolean;
  user = TestData.user;
  organization = TestData.organization;

  public login(): any {
    return returnObservable(this.resolve, TestData.loginResponse);
  }

  public logout(): any { }

  public isLoggedIn(): any {
    return returnObservable(this.resolve, this.loggedIn);
  }

  public setUser(): any {
    return returnObservable(this.resolve);
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
    return Observable.of(this.value);
  }

  public put(): any {
    return Observable.of(this.value);
  }

  public delete(): any {
    return Observable.of(this.value);
  }
}

export class BrandsActionsMock {
  public fetchBrands() {}
  public createBrand() {}
  public updateBrand() {}
  public deleteBrand() {}
  public filterBrands() {}
}

export class CategoriesActionsMock {
  public fetchCategories() {}
  public createCategory() {}
  public updateCategory() {}
  public deleteCategory() {}
  public filterCategories() {}
}

export class ItemsActionsMock {
  public fetchItems() {}
  public createItem() {}
  public updateItem() {}
  public deleteItem() {}
  public resetItems() {}
  public updateTempItem() {}
  public addToRentals() {}
  public resetRentals() {}
  public startRental() {}
  public removeFromRentals() {}
  public returnItems() {}
  public rentItems() {}
  public resetTempItem() {}
}

export class KitModelsActionsMock {
  public fetchKitModels() {}
  public deleteTemp() {}
  public createTemp() {}
  public updateTemp() {}
  public resetTempKitModels() {}
}

export class KitsActionsMock {
  public fetchKits() {}
  public deleteKit() {}
  public createKit() {}
  public updateKit() {}
}

export class LayoutActionsMock {
  public showLoadingMessage() {}
  public hideLoadingMessage() {}
}

export class ModelsActionsMock {
  public fetchModels() {}
  public createModel() {}
  public updateModel() {}
  public deleteModel() {}
  public filterModels() {}
}

export class OrganizationActionsMock {
  public fetchOrganization() {}
}

export class UserActionsMock {
  public loginUser() {}
  public logoutUser() {}
  public fetchUser() {}
  public updateUser() {}
  public checkUserLoggedIn() {}
  public archiveUser() {}
  public changeUserPassword() {}
}

export class BrandsServiceMock {
  public getBrands() {
    return Observable.of(TestData.brands);
  }

  public getShouldShowAddNew() {
    return Observable.of(TestData.showAddNew);
  }
}

export class CategoriesServiceMock {
  public getCategories() {
    return Observable.of(TestData.categories);
  }

  public getShouldShowAddNew() {
    return Observable.of(TestData.showAddNew);
  }
}

export class ItemsServiceMock {
  public getItems() {
    return Observable.of(TestData.items);
  }

  public getShouldLoadMoreItems() {
    return Observable.of(TestData.loadMoreItems);
  }

  public getShouldShowAddNew() {
    return Observable.of(TestData.showAddNew);
  }

  public getItem() {
    return Observable.of(TestData.apiItem);
  }

  public getTempItem() {
    return Observable.of(TestData.apiItem);
  }
}

export class KitModelsServiceMock {
  public getKitModels() {
    return Observable.of(TestData.kitModels.results);
  }

  public getShouldShowLoadingSpinner() {
    return Observable.of(TestData.showLoadingSpinner);
  }

  public getTempKitModels() {
    return Observable.of(TestData.kitModels);
  }
}

export class KitsServiceMock {
  public getKits() {
    return Observable.of(TestData.kits);
  }

  public getKit() {
    return Observable.of(TestData.kit);
  }
}

export class LayoutServiceMock {
  loadingMessage: Observable<string> = Observable.of('');

  public getLoadingMessage() {
    return Observable.of(this.loadingMessage);
  }
}

export class ModelsServiceMock {
  public getModels() {
    return Observable.of(TestData.models);
  }

  public getShouldShowAddNew() {
    return Observable.of(TestData.showAddNew);
  }
}

export class OrganizationServiceMock {
  public getOrganization() {
    return Observable.of(TestData.organization);
  }
}

export class UserServiceMock {
  public getUser() {
    return Observable.of(TestData.user);
  }
}

export class StoreMock {
  state = TestData.state;

  public select(select) {
    return Observable.of(select(this.state));
  }

  public dispatch() {}

  get fakeData() {
    return this.state;
  }
}

export function returnObservable(resolve: boolean, value?: any): any {
  if (resolve) {
    return Observable.of(value);
  } else {
    return Observable.throw(TestData.error);
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
