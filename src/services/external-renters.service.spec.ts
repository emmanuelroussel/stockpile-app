import { StoreMock } from '../mocks';
import { ExternalRentersService } from './external-renters.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: ExternalRentersService = null;

describe('ExternalRenters Service', () => {

  beforeEach(() => {
    instance = new ExternalRentersService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns external renters', () => {
    expect(instance.getExternalRenters()).toEqual(Observable.of(TestData.state.externalRenters));
  });

  it('returns external renter', () => {
    expect(instance.getExternalRenter(TestData.externalRenter.externalRenterID)).toEqual(Observable.of(TestData.externalRenter));
  });

  it('returns showAddNew', () => {
    expect(instance.getShouldShowAddNew()).toEqual(Observable.of(TestData.state.externalRenters.showAddNew));
  });
});
