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
  readonly showAddNew: boolean;
  readonly tempItem: any;
  readonly rentals: { [barcode: string]: Item };
  readonly showLoadingSpinner: boolean;
}
