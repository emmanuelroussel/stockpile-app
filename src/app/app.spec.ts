import {
  MenuMock,
  NavMock,
  UserActionsMock,
  LoadingMock,
  OrganizationServiceMock,
  UserServiceMock,
  LayoutServiceMock,
  BrandsServiceMock,
  ModelsServiceMock,
  CategoriesServiceMock,
  BrandsActionsMock,
  ModelsActionsMock,
  CategoriesActionsMock
} from '../mocks';
import { StockpileApp } from './app.component';
import { ViewAccountPage } from '../pages/view-account/view-account';
import { FieldsPage } from '../pages/fields/fields';
import { TestData } from '../test-data';
import { ItemProperties } from '../constants';
import { Observable } from 'rxjs/Observable';

let instance: any = null;

describe('Root Component', () => {

  beforeEach(() => {
    instance = new StockpileApp(
      (<any> new MenuMock),
      (<any> new OrganizationServiceMock),
      (<any> new LoadingMock),
      (<any> new UserServiceMock),
      (<any> new UserActionsMock),
      (<any> new LayoutServiceMock),
      (<any> new BrandsServiceMock),
      (<any> new ModelsServiceMock),
      (<any> new CategoriesServiceMock),
      (<any> new BrandsActionsMock),
      (<any> new ModelsActionsMock),
      (<any> new CategoriesActionsMock)
    );
    instance.nav = (<any> new NavMock);
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('checks if user is logged in', () => {
    spyOn(instance.userActions, 'checkUserLoggedIn');
    instance.ngOnInit();
    expect(instance.userActions.checkUserLoggedIn).toHaveBeenCalled();
  });

  it('pushes ViewAccountPage on viewInfo()', () => {
    spyOn(instance.menuCtrl, 'close');
    spyOn(instance.nav, 'push');
    instance.onViewInfo();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
    expect(instance.nav.push).toHaveBeenCalledWith(ViewAccountPage);
  });

  it('pushes FieldsPage with brands on viewBrands()', () => {
    spyOn(instance.menuCtrl, 'close');
    spyOn(instance.nav, 'push');
    spyOn(instance.brandsActions, 'fetchBrands');
    instance.onViewBrands();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
    expect(instance.nav.push).toHaveBeenCalledWith(FieldsPage, {
      fields: Observable.of(TestData.brands),
      type: ItemProperties.brand,
      typePlural: ItemProperties.brandPlural
    });
    expect(instance.brandsActions.fetchBrands).toHaveBeenCalled();
  });

  it('pushes FieldsPage with models on viewModels()', () => {
    spyOn(instance.menuCtrl, 'close');
    spyOn(instance.nav, 'push');
    spyOn(instance.modelsActions, 'fetchModels');
    instance.onViewModels();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
    expect(instance.nav.push).toHaveBeenCalledWith(FieldsPage, {
      fields: Observable.of(TestData.models),
      type: ItemProperties.model,
      typePlural: ItemProperties.modelPlural
    });
    expect(instance.modelsActions.fetchModels).toHaveBeenCalled();
  });

  it('pushes FieldsPage with categories on viewCategories()', () => {
    spyOn(instance.menuCtrl, 'close');
    spyOn(instance.nav, 'push');
    spyOn(instance.categoriesActions, 'fetchCategories');
    instance.onViewCategories();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
    expect(instance.nav.push).toHaveBeenCalledWith(FieldsPage, {
      fields: Observable.of(TestData.categories),
      type: ItemProperties.category,
      typePlural: ItemProperties.categoryPlural
    });
    expect(instance.categoriesActions.fetchCategories).toHaveBeenCalled();
  });

  it('logs user out and closes side menu', () => {
    spyOn(instance.userActions, 'logoutUser');
    spyOn(instance.menuCtrl, 'close');
    instance.onLogout();
    expect(instance.userActions.logoutUser).toHaveBeenCalled();
    expect(instance.menuCtrl.close).toHaveBeenCalled();
  });
});
