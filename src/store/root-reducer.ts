import { userReducer } from './user/user.reducer';
import { organizationReducer } from './organization/organization.reducer';
import { itemsReducer } from './items/items.reducer';
import { kitsReducer } from './kits/kits.reducer';
import { kitModelsReducer } from './kit-models/kit-models.reducer';
import { brandsReducer } from './brands/brands.reducer';
import { modelsReducer } from './models/models.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { layoutReducer } from './layout/layout.reducer';
import { externalRentersReducer } from './external-renters/external-renters.reducer';
import { customFieldsReducer } from './custom-fields/custom-fields.reducer';
import { customFieldCategoriesReducer } from './custom-field-categories/custom-field-categories.reducer';

export const rootReducer = {
  user: userReducer,
  organization: organizationReducer,
  items: itemsReducer,
  kits: kitsReducer,
  kitModels: kitModelsReducer,
  brands: brandsReducer,
  models: modelsReducer,
  categories: categoriesReducer,
  layout: layoutReducer,
  externalRenters: externalRentersReducer,
  customFields: customFieldsReducer,
  customFieldCategories: customFieldCategoriesReducer
};
