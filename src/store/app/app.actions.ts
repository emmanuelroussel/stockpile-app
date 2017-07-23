import { Injectable } from '@angular/core';

@Injectable()
export class AppActions {

  static POP_NAV = 'POP_NAV';
  static POP_NAV_TWICE = 'POP_NAV_TWICE';
  static SET_ROOT_TO = 'SET_ROOT_TO';
  static PUSH_PAGE = 'PUSH_PAGE';
  static POP_NAV_TO_ROOT = 'POP_NAV_TO_ROOT';

  static INITIALIZE_APP = 'INITIALIZE_APP';

  constructor() {}
}
