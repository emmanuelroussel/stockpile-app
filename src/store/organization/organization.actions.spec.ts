import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';

import { OrganizationActions } from './organization.actions';

let instance: OrganizationActions = null;

describe('Organization Actions', () => {

  beforeEach(() => {
    instance = new OrganizationActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchOrganization();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(OrganizationActions.FETCH));
  });
});
