export interface CustomFieldCategory {
  readonly categoryID: number;
  readonly customFieldID: number;
  readonly categoryName: string;
  readonly customFieldName: string;
  readonly organizationID: number;
  readonly sortIndex: number;
}

export interface CustomFieldCategories {
  readonly results: { [customFieldID: number]: Array<CustomFieldCategory> };
  readonly tempCustomFieldCategories: Array<CustomFieldCategory>;
  readonly showLoadingSpinner: boolean;
}
