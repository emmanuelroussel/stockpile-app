export interface Rental {
  readonly endDate: string;
  readonly organizationID: number;
  readonly rentalID: number;
  readonly returnDate: string;
  readonly startDate: string;
  readonly barcode: string;
  readonly userID: string;
  readonly notes: string;
  readonly externalRenterID: number;
}
