export interface ItemCustomField {
  readonly categoryName: string;
  readonly customFieldID: number;
  readonly customFieldName: string;
  readonly organizationID: number;
  readonly value: string;
  readonly sortIndex: number;
}

export interface Item {
  readonly organizationID: number;
  readonly modelID: number;
  readonly model: string;
  readonly brandID: number;
  readonly brand: string;
  readonly categoryID: number;
  readonly category: string;
  readonly barcode: string;
  readonly notes: string;
  readonly available: boolean;
}

export interface Items {
  readonly results: { [barcode: string]: Item };
  readonly tempItem: any;
  readonly tempItemCustomFields: Array<ItemCustomField>;
  readonly rentals: { [barcode: string]: Item };
  readonly showLoadingSpinner: boolean;
}
