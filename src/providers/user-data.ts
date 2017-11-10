import { Injectable } from '@angular/core';
import { Links } from '../constants';
import { Api } from './api';

@Injectable()
export class UserData {

  constructor(public api: Api) {}

  /**
   * Calls api with credentials to log in and saves auth token.
   */
  login(credentials: any) {
    return this.api.post(`${Links.authenticate}`, credentials);
  }

  /**
   * Calls api to get a new refresh token.
   */
  refreshAccessToken(body: any) {
    return this.api.post(`${Links.authenticate}${Links.refresh}`, body);
  }

  /**
   * Calls api to edit user.
   */
  updateUser(userID: number, user?: any) {
    return this.api.put(`${Links.user}/${userID}`, user);
  }

  /**
   * Calls api with current and new password to change the user's password.
   */
  changePassword(userID: number, passwords: any) {
    return this.api.put(`${Links.user}/${userID}${Links.password}`, passwords);
  }

  /**
   * Calls api to get user info.
   */
  getUser(userID: number) {
    return this.api.get(`${Links.user}/${userID}`);
  }

  /**
   * Calls api to get organization info.
   */
  getOrganization(organizationID: number) {
    return this.api.get(`${Links.organization}/${organizationID}`);
  }
}
