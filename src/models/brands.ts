export interface Brand {
  readonly brandID: number;
  readonly name: string;
  readonly organizationID: number;
  readonly sortIndex: number;
}

export interface Brands {
  readonly results: { [brandID: number]: Brand };
  readonly filtered: Array<Brand>;
  readonly showAddNew: boolean;
  readonly showLoadingSpinner: boolean;
}
