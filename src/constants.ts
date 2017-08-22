export class Actions {
  public static rent = 'Rent';
  public static return = 'Return';
  public static add = 'Add';
  public static edit = 'Edit';
};

export class Links {
  public static authenticate = '/auth';
  public static item = '/item';
  public static rental = '/rental';
  public static brand = '/brand';
  public static model = '/model';
  public static category = '/category';
  public static status = '/status';
  public static user = '/user';
  public static organization = '/organization';
  public static password = '/password';
  public static kit = '/kit';
  public static active = '/active';
}

export class Messages {
  private static itemBaseSingular = 'Item successfully';
  private static itemBasePlural = 'Item(s) successfully';
  private static kitBaseSingular = 'Kit successfully';
  private static itemAlready = 'Item is already';
  public static itemAdded = `${Messages.itemBaseSingular} created`;
  public static itemEdited = `${Messages.itemBaseSingular} updated`;
  public static itemDeleted = `${Messages.itemBaseSingular} deleted`;
  public static kitAdded = `${Messages.kitBaseSingular} created`;
  public static kitEdited = `${Messages.kitBaseSingular} updated`;
  public static kitDeleted = `${Messages.kitBaseSingular} deleted`;
  public static itemsReturned = `${Messages.itemBasePlural} returned`;
  public static itemsRented = `${Messages.itemBasePlural} rented`;
  public static itemAlreadyAdded = `${Messages.itemAlready} added to the list`;
  public static itemAlreadyRented = `${Messages.itemAlready} rented`;
  public static itemNotRented = 'Item is not currently rented';
  public static userEdited = 'User successfully updated';
  public static passwordsDontMatch = 'Passwords don\'t match';
  public static wrongPassword = 'Password is incorrect';
  public static userDeleted = 'Account succesfully deleted';
}

export class LoadingMessages {
  public static creatingBrand = 'Creating brand...';
  public static creatingCategory = 'Creating category...';
  public static creatingKit = 'Creating kit...';
  public static updatingKit = 'Updating kit...';
  public static deletingKit = 'Deleting kit...';
  public static creatingItem = 'Creating item...';
  public static updatingItem = 'Updating item...';
  public static deletingItem = 'Deleting item...';
  public static rentingItems = 'Renting items...';
  public static returningItems = 'Returning items...';
  public static addingToRentals = 'Verifying item status...';
  public static startingRental = 'Verifying item status...';
  public static creatingModel = 'Creating model...';
  public static savingPassword = 'Saving password...';
  public static updatingUser = 'Updating account info...';
  public static loggingInUser = 'Logging in...';
  public static archivingUser = 'Archiving account...';
}

export class ItemProperties {
  public static brand = 'Brand';
  public static model = 'Model';
  public static category = 'Category';
  public static status = 'Status';
}

export const paginationLimit = 10;

export const apiVersion = '^1.0.0';

export const subscribeUrl = 'https://stockpileapp.co/subscribe';
