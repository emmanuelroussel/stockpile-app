import { StoreMock } from '../mocks';
import { LayoutService } from './layout.service';
import { TestData } from '../test-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let instance: LayoutService = null;

describe('Layout Service', () => {

  beforeEach(() => {
    instance = new LayoutService((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('returns loadingMessage', () => {
    expect(instance.getLoadingMessage()).toEqual(Observable.of(TestData.state.layout.loadingMessage));
  });
});
