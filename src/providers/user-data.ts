import { Injectable } from '@angular/core';

@Injectable()
export class UserData {

  constructor() { }

  login(email: string, password: string) {
    return Promise.resolve();
  }
}
