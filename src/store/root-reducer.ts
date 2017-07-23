import { userReducer } from './user/user.reducer';
import { organizationReducer } from './organization/organization.reducer';
import { itemsReducer } from './items/items.reducer';
import { kitsReducer } from './kits/kits.reducer';
import { kitModelsReducer } from './kit-models/kit-models.reducer';
import { brandsReducer } from './brands/brands.reducer';
import { modelsReducer } from './models/models.reducer';
import { categoriesReducer } from './categories/categories.reducer';

export const rootReducer = {
  user: userReducer,
  organization: organizationReducer,
  items: itemsReducer,
  kits: kitsReducer,
  kitModels: kitModelsReducer,
  brands: brandsReducer,
  models: modelsReducer,
  categories: categoriesReducer
};
