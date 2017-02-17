export class TestData {
  public static item = {
    tag: 'banana',
    brand: 'Canon',
    model: 'Rebel T5i',
    category: 'Camera',
    cost: '750',
    condition: 'Good'
  };

  public static items = [{
    tag: 'banana',
    brand: 'Canon',
    model: 'Rebel T5i',
    category: 'Camera',
    cost: '750',
    condition: 'Good'
  },
  {
    tag: 'banana',
    brand: 'Canon',
    model: 'Rebel T5i',
    category: 'Camera',
    cost: '750',
    condition: 'Good'
  }];

  public static details = {
    person: 'Luke Skywalker',
    purpose: 'Save the Galaxy',
    date: '01/01/2017'
  };

  public static conditions = ['Good', 'Broken', 'Getting Fixed'];

  public static categories = ['Camera', 'Stand', 'Cable'];

  public static credentials = {
    email: 'luke@rebellion.com',
    password: 'yodarocks'
  };

  public static loginResponse = {
    id: 1,
    token: '987234.sdf0982347234.hjgsdf89234',
    message: 'organization credentials are valid'
  };

  public static response = {
    message: 'Successful operation'
  };
}
