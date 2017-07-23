import { User } from './user';
import { Organization } from './organization';
import { Kits } from './kits';
import { KitModels } from './kit-models';
import { Brands } from './brands';
import { Models } from './models';
import { Categories } from './categories';
import { Items } from './items';

export interface AppState {
  readonly user: User;
  readonly organization: Organization;
  readonly kits: Kits;
  readonly kitModels: KitModels;
  readonly brands: Brands;
  readonly models: Models;
  readonly categories: Categories;
  readonly items: Items;
}
