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
}

export class Messages {
  private static baseSingular = 'Item successfully ';
  private static basePlural = 'Item(s) successfully ';
  private static already = 'Item is already ';
  public static itemAdded = `${Messages.baseSingular} added`;
  public static itemEdited = `${Messages.baseSingular} edited`;
  public static itemDeleted = `${Messages.baseSingular} deleted`;
  public static itemsReturned = `${Messages.basePlural} returned`;
  public static itemsRented = `${Messages.basePlural} rented`;
  public static itemAlreadyAdded = `${Messages.already} added to the list`;
  public static itemAlreadyRented = `${Messages.already} rented`;
  public static itemNotRented = 'Item is not currently rented';
  public static userEdited = 'User successfully edited';
}

export class ItemProperties {
  public static brand = 'Brand';
  public static model = 'Model';
  public static category = 'Category';
  public static status = 'Status';
}
