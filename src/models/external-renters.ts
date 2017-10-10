export interface ExternalRenter {
  readonly externalRenterID: number;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly organizationID: number;
  readonly sortIndex: number;
}

export interface ExternalRenters {
  readonly results: { [externalRenterID: number]: ExternalRenter };
  readonly filtered: Array<ExternalRenter>;
  readonly showAddNew: boolean;
  readonly showLoadingSpinner: boolean;
}
