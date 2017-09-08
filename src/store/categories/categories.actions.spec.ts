import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { CategoriesActions } from './categories.actions';

let instance: CategoriesActions = null;

describe('Categories Actions', () => {

  beforeEach(() => {
    instance = new CategoriesActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchCategories();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CategoriesActions.FETCH));
  });

  it('dispatches action CREATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.createCategory(TestData.category.name, TestData.pop);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CategoriesActions.CREATE, {
      name: TestData.category.name,
      pop: TestData.pop
    }));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateCategory(TestData.category);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CategoriesActions.UPDATE, TestData.category));
  });

  it('dispatches action DELETE', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteCategory(TestData.category.categoryID);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CategoriesActions.DELETE, TestData.category.categoryID));
  });

  it('dispatches action FILTER', () => {
    spyOn(instance.store, 'dispatch');
    instance.filterCategories(TestData.queryText);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(CategoriesActions.FILTER, TestData.queryText));
  });
});
