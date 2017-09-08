export interface Category {
  readonly categoryID: number;
  readonly name: string;
  readonly organizationID: number;
}

export interface Categories {
  readonly results: { [categoryID: number]: Category };
  readonly filtered: Array<Category>;
  readonly showAddNew: boolean;
  readonly showLoadingSpinner: boolean;
}
