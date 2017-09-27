export interface Model {
  readonly modelID: number;
  readonly brandID: number;
  readonly brand: string;
  readonly name: string;
  readonly organizationID: number;
  readonly sortIndex: number;
}

export interface Models {
  readonly results: { [modelID: number]: Model };
  readonly filtered: Array<Model>;
  readonly showAddNew: boolean;
  readonly showLoadingSpinner: boolean;
}
