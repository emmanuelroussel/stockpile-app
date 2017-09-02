import { StoreMock } from '../mocks';
import { OrganizationService } from './organization.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: OrganizationService = null;

describe('Organization Service', () => {

  beforeEach(() => {
    instance = new OrganizationService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns organization', () => {
    expect(instance.getOrganization()).toEqual(Observable.of(TestData.state.organization));
  });
});
