import { StoreMock } from '../mocks';
import { KitModelsService } from './kit-models.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: KitModelsService = null;

describe('KitModels Service', () => {

  beforeEach(() => {
    instance = new KitModelsService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns kit models', () => {
    expect(instance.getKitModels(TestData.kit.kitID)).toEqual(Observable.of(TestData.state.kitModels.results[TestData.kit.kitID]));
  });

  it('returns showLoadingSpinner', () => {
    expect(instance.getShouldShowLoadingSpinner()).toEqual(Observable.of(TestData.state.kitModels.showLoadingSpinner));
  });
});
