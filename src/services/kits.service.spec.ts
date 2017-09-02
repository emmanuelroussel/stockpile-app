import { StoreMock } from '../mocks';
import { KitsService } from './kits.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: KitsService = null;

describe('Kits Service', () => {

  beforeEach(() => {
    instance = new KitsService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns kits', () => {
    expect(instance.getKits()).toEqual(Observable.of(TestData.state.kits));
  });

  it('returns kit', () => {
    expect(instance.getKit(TestData.kit.kitID)).toEqual(Observable.of(TestData.state.kits.results[TestData.kit.kitID]));
  });
});
