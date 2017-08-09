import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { LayoutActions } from './layout.actions';

let instance: LayoutActions = null;

describe('Layout Actions', () => {

  beforeEach(() => {
    instance = new LayoutActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action SHOW_LOADING_MESSAGE', () => {
    spyOn(instance.store, 'dispatch');
    instance.showLoadingMessage(TestData.response.message);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(LayoutActions.SHOW_LOADING_MESSAGE, TestData.response.message));
  });

  it('dispatches action HIDE_LOADING_MESSAGE', () => {
    spyOn(instance.store, 'dispatch');
    instance.hideLoadingMessage();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(LayoutActions.HIDE_LOADING_MESSAGE));
  });
});
