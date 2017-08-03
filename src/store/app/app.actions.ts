import { Injectable } from '@angular/core';
import { type } from '../../utils';

@Injectable()
export class AppActions {

  static POP_NAV = type('[App] Pop Nav');
  static POP_NAV_TWICE = type('[App] Pop Nav Twice');
  static SET_ROOT_TO = type('[App] Set Root To');
  static PUSH_PAGE = type('[App] Push Page');
  static POP_NAV_TO_ROOT = type('[App] Pop Nav To Root');

  static INITIALIZE = type('[App] Initialize');

  static SHOW_MESSAGE = type('[App] Show Message');

  constructor() {}
}
