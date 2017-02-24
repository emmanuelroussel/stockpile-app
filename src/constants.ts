export class Actions {
  public static rent = 'Rent';
  public static return = 'Return';
  public static add = 'Add';
  public static edit = 'Edit';
};

export const ApiUrl = 'https://stockpile.adamvig.com/api';

export class Links {
  public static authenticate = '/auth';
  public static item = '/item';
  public static rental = '/rental';
}

export class ItemProperties {
  public static brand = 'Brand';
  public static model = 'Model';
  public static category = 'Category';
  public static status = 'Status';
}
