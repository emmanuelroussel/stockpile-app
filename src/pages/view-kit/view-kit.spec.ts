import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { ViewKitPage } from './view-kit';
import { EditKitPage } from '../edit-kit/edit-kit';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<ViewKitPage> = null;
let instance: any = null;

describe('ViewKit Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ViewKitPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('fetches kit models', () => {
    instance.navParams.param = TestData.kit.kitID;
    spyOn(instance.kitModelsActions, 'fetchKitModels');
    instance.ngOnInit();
    expect(instance.kitModelsActions.fetchKitModels).toHaveBeenCalledWith(TestData.kit.kitID);
  });

  it('pushes EditKitPage on nav on editKit()', () => {
    instance.kit = Observable.of(TestData.kit);
    spyOn(instance.navCtrl, 'push');
    instance.onEditKit();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditKitPage, {
      kitID: TestData.kit.kitID,
      action: Actions.edit
    });
  });
});
