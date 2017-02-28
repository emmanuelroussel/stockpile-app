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
    categoryID: 1
  };

  public static items = [{
    tag: 'apple',
    brandID: 1,
    modelID: 1,
    categoryID: 1,
    status: 'Available'
  },
  {
    tag: 'banana',
    brandID: 2,
    modelID: 2,
    categoryID: 1,
    status: 'Rented'
  },
  {
    tag: 'mango',
    brandID: 3,
    modelID: 3,
    categoryID: 2,
    status: 'Available'
  },
  {
    tag: 'orange',
    brandID: 4,
    modelID: 4,
    categoryID: 2,
    status: 'Rented'
  }];

  public static filteredRentedItems = [{
    tag: 'orange',
    brandID: 4,
    modelID: 4,
    categoryID: 2,
    status: 'Rented'
  }];

  public static filteredAllItems =[{
    tag: 'mango',
    brandID: 3,
    modelID: 3,
    categoryID: 2,
    status: 'Available'
  },
  {
    tag: 'orange',
    brandID: 4,
    modelID: 4,
    categoryID: 2,
    status: 'Rented'
  }]

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

  public static categories = {
    results: [
      { name: 'Camera', id: 5 },
      { name: 'Mic', id: 6 },
      { name: 'Light', id: 7}
    ]
  };

  public static selectedCategoryIDs = [2];

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
