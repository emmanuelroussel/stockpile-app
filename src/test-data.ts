export class TestData {
  public static apiItem = {
    tag: 'banana',
    brand: 'Canon',
    brandID: 1,
    model: 'T5i',
    modelID: 1,
    category: 'Camera',
    categoryID: 1,
    status: 'Available',
    statusID: 1
  };

  public static item = {
    tag: 'banana',
    brandID: 1,
    modelID: 1,
    categoryID: 1,
    statusID: 1
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
      { name: 'Canon', id: 5 },
      { name: 'Nikon', id: 6 },
      { name: 'Sennheiser', id: 7}
    ]
  };

  public static filteredBrands = [
    { name: 'Canon', id: 5 }
  ];

  public static models = {
    results: [
      { name: 'T5i', id: 5 },
      { name: 'e609', id: 6 },
      { name: 'MKE 600', id: 7},
      { name: 'D5', id: 8}
    ]
  };


  public static statuses = {
    results: [
      { name: 'Available', id: 5 },
      { name: 'Rented', id: 6 },
      { name: 'Getting Fixed', id: 7}
    ]
  };

  public static categories = {
    results: [
      { name: 'Camera', id: 5 },
      { name: 'Mic', id: 6 },
      { name: 'Light', id: 7}
    ]
  };

  public static credentials = {
    email: 'luke@rebellion.com',
    password: 'yodarocks'
  };

  public static queryText = 'Can';

  public static loginResponse = {
    id: 1,
    token: '987234.sdf0982347234.hjgsdf89234',
    message: 'organization credentials are valid'
  };

  public static response = {
    message: 'Successful operation'
  };

  public static error = {
    message: 'Error message'
  };
}
