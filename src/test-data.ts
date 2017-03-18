export class TestData {
  public static apiItem = {
    tag: 'banana',
    brand: 'Canon',
    brandID: 1,
    model: 'T5i',
    modelID: 1,
    category: 'Camera',
    categoryID: 1,
    available: 1
  };

  public static rentedApiItem = {
    tag: 'banana',
    brand: 'Canon',
    brandID: 1,
    model: 'T5i',
    modelID: 1,
    category: 'Camera',
    categoryID: 1,
    available: 0
  };

  public static item = {
    tag: 'banana',
    modelID: 1,
    categoryID: 1
  };

  public static items = [{
    tag: 'apple',
    brandID: 1,
    modelID: 1,
    categoryID: 1,
    available: 1
  },
  {
    tag: 'banana',
    brandID: 2,
    modelID: 2,
    categoryID: 1,
    available: 0
  },
  {
    tag: 'mango',
    brandID: 3,
    modelID: 3,
    categoryID: 2,
    available: 1
  },
  {
    tag: 'orange',
    brandID: 4,
    modelID: 4,
    categoryID: 2,
    available: 0
  }];

  public static filteredItems = {
    results: [{
      tag: 'apple',
      brandID: 1,
      modelID: 1,
      categoryID: 1,
      available: 1
    },
    {
      tag: 'banana',
      brandID: 2,
      modelID: 2,
      categoryID: 1,
      available: 0
    }]
  };

  public static details = {
    startDate: '01/01/2017',
    endDate: '01/02/2017'
  };

  public static brands = {
    results: [
      { name: 'Canon', id: 1 },
      { name: 'Nikon', id: 2 },
      { name: 'Sennheiser', id: 3}
    ]
  };

  public static filteredBrands = [
    { name: 'Canon', id: 1 }
  ];

  public static models = {
    results: [
      { name: 'T5i', id: 5, brandID: 1 },
      { name: 'e609', id: 6, brandID: 3 },
      { name: 'MKE 600', id: 7, brandID: 2 },
      { name: 'D5', id: 8, brandID: 2 }
    ]
  };

  public static filteredModels = [
    { name: 'T5i', id: 5, brandID: 1 }
  ];

  public static categories = {
    results: [
      { name: 'Camera', id: 1 },
      { name: 'Mic', id: 2 },
      { name: 'Light', id: 3 }
    ]
  };

  public static status = {
    status: 'available'
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

  public static error = 'Error message';

  public static barcodeData = {
    text: 'I am a barcode'
  };
}
