export class TestData {
  public static apiItem = {
    barcode: 'banana',
    brand: 'Canon',
    brandID: 1,
    model: 'T5i',
    modelID: 1,
    category: 'Camera',
    categoryID: 1,
    available: 1
  };

  public static rentedApiItem = {
    barcode: 'banana',
    brand: 'Canon',
    brandID: 1,
    model: 'T5i',
    modelID: 1,
    category: 'Camera',
    categoryID: 1,
    available: 0
  };

  public static item = {
    barcode: 'banana',
    modelID: 1,
    categoryID: 1
  };

  public static modifiedItem = {
    barcode: 'mango',
    brandID: 2,
    modelID: 3,
    categoryID: 3,
    available: 1
  };

  public static modifiedItems = [{
    barcode: 'apple',
    brandID: 1,
    modelID: 1,
    categoryID: 1,
    available: 1
  },
  {
    barcode: 'banana',
    brandID: 2,
    modelID: 2,
    categoryID: 1,
    available: 0
  },
  {
    barcode: 'mango',
    brandID: 2,
    modelID: 3,
    categoryID: 3,
    available: 1
  },
  {
    barcode: 'orange',
    brandID: 4,
    modelID: 4,
    categoryID: 2,
    available: 0
  }];

  public static items = [{
    barcode: 'apple',
    brandID: 1,
    modelID: 1,
    categoryID: 1,
    available: 1
  },
  {
    barcode: 'banana',
    brandID: 2,
    modelID: 2,
    categoryID: 1,
    available: 0
  },
  {
    barcode: 'mango',
    brandID: 3,
    modelID: 3,
    categoryID: 2,
    available: 1
  },
  {
    barcode: 'orange',
    brandID: 4,
    modelID: 4,
    categoryID: 2,
    available: 0
  }];

  public static barcode = 'mango';

  public static itemsMinusOne = [{
    barcode: 'apple',
    brandID: 1,
    modelID: 1,
    categoryID: 1,
    available: 1
  },
  {
    barcode: 'banana',
    brandID: 2,
    modelID: 2,
    categoryID: 1,
    available: 0
  },
  {
    barcode: 'orange',
    brandID: 4,
    modelID: 4,
    categoryID: 2,
    available: 0
  }];

  public static filteredItems = {
    results: [{
      barcode: 'apple',
      brandID: 1,
      modelID: 1,
      categoryID: 1,
      available: 1
    },
    {
      barcode: 'banana',
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

  public static brand = {
    name: 'Canon', brandID: 1
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

  public static model = {
    name: 'T5i',
    modelID: 1,
    brandID: 1
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

  public static category = {
    name: 'Camera',
    categoryID: 1
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
    message: 'Successful operation',
    id: 1
  };

  public static error = 'Error message';

  public static barcodeData = {
    text: 'I am a barcode',
    cancelled: false
  };

  public static barcodeDataCancelled = {
    text: 'I am a barcode',
    cancelled: true
  };

  public static user = {
    userID: 1,
    firstName: 'Dark',
    lastName: 'Vader',
    email: 'vader@empire.xyz',
    organizationID: 1
  };

  public static organization = {
    organizationID: 1,
    name: 'Empire'
  };

  public static token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjc0LCJvcmdhbml6YXRpb25JRCI6NTM5LCJyb2xlSUQiOjJ9.6RmCILl0xuZcaRnZpBKn6OR_kFw09yBpB64aXuJYvbo';

  public static decodedToken = {
    userID: 74,
    organizationID: 539
  };
}
