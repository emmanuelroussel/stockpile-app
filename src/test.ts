// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform, GestureController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ConfigMock, PlatformMock, NavMock, NavParamsMock, InventoryDataMock, UserDataMock, ModalMock, IonicPluginsMock, AlertMock, BarcodeScannerMock } from './mocks';
import { InventoryData } from './providers/inventory-data';
import { UserData } from './providers/user-data';
import { IonicPlugins } from './providers/ionic-plugins';

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
      ],
      providers: [
        App, Form, Keyboard, DomController, MenuController, GestureController,
        NgForm, AlertController, Events,
        { provide: Platform, useClass: PlatformMock },
        { provide: Config, useClass: ConfigMock },
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: InventoryData, useClass: InventoryDataMock },
        { provide: UserData, useClass: UserDataMock },
        { provide: ModalController, useClass: ModalMock },
        { provide: IonicPlugins, useClass: IonicPluginsMock },
        { provide: AlertController, useClass: AlertMock },
        { provide: BarcodeScanner, useClass: BarcodeScannerMock }
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
