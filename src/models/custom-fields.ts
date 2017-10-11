export interface CustomField {
  readonly customFieldID: number;
  readonly name: string;
  readonly organizationID: number;
  readonly sortIndex: number;
}

export interface CustomFields {
  readonly results: { [customFieldID: number]: CustomField };
  readonly showLoadingSpinner: boolean;
}
