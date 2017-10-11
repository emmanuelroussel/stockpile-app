// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {
  App,
  Config,
  Form,
  IonicModule,
  Keyboard,
  DomController,
  MenuController,
  NavController,
  Platform,
  GestureController,
  NavParams,
  ModalController,
  AlertController,
  Events,
  LoadingController,
  DeepLinker
} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {
  ConfigMock,
  PlatformMock,
  NavMock,
  NavParamsMock,
  CustomFieldDataMock,
  ItemDataMock,
  KitDataMock,
  ItemPropertyDataMock,
  UserDataMock,
  ModalMock,
  NotificationsMock,
  AlertMock,
  BarcodeScannerMock,
  LoadingMock,
  BrandsActionsMock,
  CategoriesActionsMock,
  ExternalRentersActionsMock,
  CustomFieldCategoriesActionsMock,
  CustomFieldsActionsMock,
  ItemsActionsMock,
  KitModelsActionsMock,
  KitsActionsMock,
  LayoutActionsMock,
  ModelsActionsMock,
  OrganizationActionsMock,
  UserActionsMock,
  BrandsServiceMock,
  CategoriesServiceMock,
  ExternalRentersServiceMock,
  CustomFieldCategoriesServiceMock,
  CustomFieldsServiceMock,
  ItemsServiceMock,
  KitModelsServiceMock,
  KitsServiceMock,
  LayoutServiceMock,
  ModelsServiceMock,
  OrganizationServiceMock,
  UserServiceMock,
  InAppBrowserMock,
  DeepLinkerMock
} from './mocks';
import { BrandsActions } from './store/brands/brands.actions';
import { CustomFieldCategoriesActions } from './store/custom-field-categories/custom-field-categories.actions';
import { CustomFieldsActions } from './store/custom-fields/custom-fields.actions';
import { CategoriesActions } from './store/categories/categories.actions';
import { ExternalRentersActions } from './store/external-renters/external-renters.actions';
import { ItemsActions } from './store/items/items.actions';
import { KitModelsActions } from './store/kit-models/kit-models.actions';
import { KitsActions } from './store/kits/kits.actions';
import { LayoutActions } from './store/layout/layout.actions';
import { ModelsActions } from './store/models/models.actions';
import { OrganizationActions } from './store/organization/organization.actions';
import { UserActions } from './store/user/user.actions';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ExternalRentersService } from './services/external-renters.service';
import { CustomFieldCategoriesService } from './services/custom-field-categories.service';
import { CustomFieldsService } from './services/custom-fields.service';
import { ItemsService } from './services/items.service';
import { KitModelsService } from './services/kit-models.service';
import { KitsService } from './services/kits.service';
import { LayoutService } from './services/layout.service';
import { ModelsService } from './services/models.service';
import { OrganizationService } from './services/organization.service';
import { UserService } from './services/user.service';
import { CustomFieldData } from './providers/custom-field-data';
import { ItemData } from './providers/item-data';
import { KitData } from './providers/kit-data';
import { ItemPropertyData } from './providers/item-property-data';
import { UserData } from './providers/user-data';
import { Notifications } from './providers/notifications';
import { MapToIterablePipe, SortPipe } from './pipes';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): void {
  // noop
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
        MapToIterablePipe,
        SortPipe
      ],
      providers: [
        App, Form, Keyboard, DomController, MenuController, GestureController,
        NgForm, AlertController, Events, FormBuilder, Validators,
        { provide: Platform, useClass: PlatformMock },
        { provide: Config, useClass: ConfigMock },
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: CustomFieldData, useClass: CustomFieldDataMock },
        { provide: ItemData, useClass: ItemDataMock },
        { provide: KitData, useClass: KitDataMock },
        { provide: ItemPropertyData, useClass: ItemPropertyDataMock },
        { provide: UserData, useClass: UserDataMock },
        { provide: ModalController, useClass: ModalMock },
        { provide: Notifications, useClass: NotificationsMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: BarcodeScanner, useClass: BarcodeScannerMock },
        { provide: LoadingController, useClass: LoadingMock },
        { provide: BrandsActions, useClass: BrandsActionsMock },
        { provide: CategoriesActions, useClass: CategoriesActionsMock },
        { provide: ExternalRentersActions, useClass: ExternalRentersActionsMock },
        { provide: CustomFieldCategoriesActions, useClass: CustomFieldCategoriesActionsMock },
        { provide: CustomFieldsActions, useClass: CustomFieldsActionsMock },
        { provide: ItemsActions, useClass: ItemsActionsMock },
        { provide: KitModelsActions, useClass: KitModelsActionsMock },
        { provide: KitsActions, useClass: KitsActionsMock },
        { provide: LayoutActions, useClass: LayoutActionsMock },
        { provide: ModelsActions, useClass: ModelsActionsMock },
        { provide: OrganizationActions, useClass: OrganizationActionsMock },
        { provide: UserActions, useClass: UserActionsMock },
        { provide: BrandsService, useClass: BrandsServiceMock },
        { provide: CategoriesService, useClass: CategoriesServiceMock },
        { provide: ExternalRentersService, useClass: ExternalRentersServiceMock },
        { provide: CustomFieldCategoriesService, useClass: CustomFieldCategoriesServiceMock },
        { provide: CustomFieldsService, useClass: CustomFieldsServiceMock },
        { provide: ItemsService, useClass: ItemsServiceMock },
        { provide: KitModelsService, useClass: KitModelsServiceMock },
        { provide: KitsService, useClass: KitsServiceMock },
        { provide: LayoutService, useClass: LayoutServiceMock },
        { provide: ModelsService, useClass: ModelsServiceMock },
        { provide: OrganizationService, useClass: OrganizationServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: InAppBrowser, useClass: InAppBrowserMock },
        { provide: DeepLinker, useClass: DeepLinkerMock }
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
