export interface Kit {
  readonly kitID: number;
  readonly name: string;
  readonly organizationID: number;
  readonly sortIndex: number;
}

export interface Kits {
  readonly results: { [kitID: number]: Kit };
  readonly showLoadingSpinner: boolean;
}
