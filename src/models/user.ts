export interface User {
  readonly userID: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly organizationID: number;
  readonly archived: string;
  readonly loading: boolean;
}
