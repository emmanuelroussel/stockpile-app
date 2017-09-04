import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, LoadingMessages } from '../../constants';

import { EditKitPage } from './edit-kit';
import { AddKitModelPage } from '../add-kit-model/add-kit-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let fixture: ComponentFixture<EditKitPage> = null;
let instance: any = null;

describe('EditKit Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([EditKitPage]).then(compiled => {
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

  it('gets navParam action', () => {
    instance.navParams.param = Actions.add;
    instance.ngOnInit();
    expect(instance.action).toEqual(Actions.add);
  });

  it('fetches kit models if action is edit', () => {
    instance.navParams.param = Actions.edit;
    spyOn(instance.kitModelsActions, 'fetchKitModels');
    instance.ngOnInit();
    expect(instance.kitModelsActions.fetchKitModels).toHaveBeenCalled();
  });

  it('creates an alert if there are no kit models onSave()', () => {
    instance.kitModels = Observable.of([]);
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onSave();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('creates kit onSave() if action is add', () => {
    const form = {
      value: {
        name: TestData.kit.name
      }
    };
    instance.action = Actions.add;
    instance.kitModels = Observable.of([TestData.kitModel.modelID]);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'createKit');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingKit);
    expect(instance.kitsActions.createKit).toHaveBeenCalledWith(form.value);
  });

  it('updates kit onSave() if action is edit', () => {
    const form = {
      value: {
        name: TestData.kit.name
      }
    };
    instance.action = Actions.edit;
    instance.kit = Observable.of(TestData.kit);
    instance.kitModels = Observable.of([TestData.kitModel.modelID]);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'updateKit');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingKit);
    expect(instance.kitsActions.updateKit).toHaveBeenCalledWith({
      name: TestData.kit.name,
      kitID: TestData.kit.kitID
    });
  });

  it('creates an alert onDelete()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onDelete();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('deletes kit on deleteKit()', () => {
    instance.kit = Observable.of(TestData.kit);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'deleteKit');
    instance.deleteKit();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingKit);
    expect(instance.kitsActions.deleteKit).toHaveBeenCalledWith(TestData.kit.kitID);
  });

  it('pushes AddKitModelPage onAddItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAddItem(Actions.add, TestData.kitModel);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(AddKitModelPage, {
      action: Actions.add,
      kitModel: TestData.kitModel
    });
  });

  it('removes kit models onRemoveFromList()', () => {
    spyOn(instance.kitModelsActions, 'deleteTemp');
    instance.onRemoveFromList(TestData.kitModel.modelID);
    expect(instance.kitModelsActions.deleteTemp).toHaveBeenCalledWith(TestData.kitModel.modelID);
  });
});
