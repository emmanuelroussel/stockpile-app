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
  public static brand = '/brand';
  public static model = '/model';
  public static category = '/category';
  public static status = '/status';
}
