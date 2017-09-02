import { StoreMock } from '../mocks';
import { ModelsService } from './models.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: ModelsService = null;

describe('Models Service', () => {

  beforeEach(() => {
    instance = new ModelsService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns models', () => {
    expect(instance.getModels()).toEqual(Observable.of(TestData.state.models));
  });

  it('returns showAddNew', () => {
    expect(instance.getShouldShowAddNew()).toEqual(Observable.of(TestData.state.models.showAddNew));
  });
});
