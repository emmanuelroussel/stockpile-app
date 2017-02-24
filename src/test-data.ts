export class TestData {
  public static item = {
    tag: 'banana',
    brand: 'Canon',
    model: 'T5i',
    category: 'Camera',
    status: 'Available'
  };

  public static items = [{
    tag: 'banana',
    brand: 'Canon',
    model: 'T5i',
    category: 'Camera',
    status: 'Available'
  },
  {
    tag: 'banana',
    brand: 'Canon',
    model: 'T5i',
    category: 'Camera',
    status: 'Available'
  }];

  public static details = {
    startDate: '01/01/2017',
    endDate: '01/02/2017'
  };

  public static brands = {
    results: [
      { name: 'Canon', brandID: 5 },
      { name: 'Nikon', brandID: 6 },
      { name: 'Sennheiser', brandID: 7}
    ]
  };

  public static models = {
    results: [
      { name: 'T5i', modelID: 5 },
      { name: 'e609', modelID: 6 },
      { name: 'MKE 600', modelID: 7},
      { name: 'D5', modelID: 8}
    ]
  };

  public static statuses = {
    results: [
      { name: 'Available', statusID: 5 },
      { name: 'Rented', statusID: 6 },
      { name: 'Getting Fixed', statusID: 7}
    ]
  };

  public static categories = {
    results: [
      { name: 'Camera', categoryID: 5 },
      { name: 'Mic', categoryID: 6 },
      { name: 'Light', categoryID: 7}
    ]
  };

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
