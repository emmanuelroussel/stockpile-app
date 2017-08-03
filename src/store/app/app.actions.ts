import { Injectable } from '@angular/core';

@Injectable()
export class AppActions {

  static POP_NAV = '[App] Pop Nav';
  static POP_NAV_TWICE = '[App] Pop Nav Twice';
  static SET_ROOT_TO = '[App] Set Root To';
  static PUSH_PAGE = '[App] Push Page';
  static POP_NAV_TO_ROOT = '[App] Pop Nav To Root';

  static INITIALIZE = '[App] Initialize';

  static SHOW_MESSAGE = '[App] Show Message';

  constructor() {}
}
