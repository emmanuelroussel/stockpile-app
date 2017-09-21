export interface CustomFieldCategory {
  readonly categoryID: number;
  readonly customFieldID: number;
  readonly name: string;
  readonly organizationID: number;
}

export interface CustomFieldCategories {
  readonly results: { [customFieldID: number]: Array<CustomFieldCategory> };
  readonly tempCustomFieldCategories: Array<CustomFieldCategory>;
  readonly showLoadingSpinner: boolean;
}
