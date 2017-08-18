import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, LoadingMessages } from '../../constants';

import { EditKitPage } from './edit-kit';
import { AddKitModelPage } from '../add-kit-model/add-kit-model';
import { Observable } from 'rxjs/Observable';

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

  it('adds a kitModel if event \'kit-item:added\' is published', () => {
    instance.ngOnInit();
    instance.kitModels = TestData.kitModels.results.slice();
    instance.events.publish('kit-item:added', TestData.kitModel);
    expect(instance.kitModels).toEqual(TestData.addedKitModels.results);
    expect(instance.modelsToCreate).toEqual([TestData.kitModel.modelID]);
  });

  it('gets kit models if action is edit', () => {
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    expect(instance.kitModels).toEqual(TestData.kitModels.results);
  });

  it('creates an alert if there are no kit models onSave()', () => {
    instance.modelsToCreate = [];
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
    instance.modelsToCreate = [TestData.kitModel.modelID];
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'createKit');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingKit);
    expect(instance.kitsActions.createKit).toHaveBeenCalledWith(form.value, [TestData.kitModel.modelID]);
  });

  it('updates kit onSave() if action is edit', () => {
    const form = {
      value: {
        name: TestData.kit.name
      }
    };
    instance.action = Actions.edit;
    instance.kit = Observable.of(TestData.kit);
    instance.modelsToCreate = [TestData.kitModel.modelID];
    instance.modelsToDelete = [TestData.kitModels.results[0]];
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'updateKit');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingKit);
    expect(instance.kitsActions.updateKit).toHaveBeenCalledWith(
      { name: TestData.kit.name, kitID: TestData.kit.kitID },
      [TestData.kitModel.modelID],
      [TestData.kitModels.results[0]]
    );
  });

  it('creates an alert onDelete()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onDelete();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('deletes item deleteKit()', () => {
    instance.kit = Observable.of(TestData.kit);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'deleteKit');
    instance.deleteKit();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingKit);
    expect(instance.kitsActions.deleteKit).toHaveBeenCalledWith(TestData.kit.kitID);
  });

  it('pushes AddKitModelPage onAddItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAddItem();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(AddKitModelPage);
  });

  it('removes kit models onRemoveFromList()', () => {
    instance.kitModels = TestData.kitModels.results.slice();
    instance.onRemoveFromList(0, TestData.kitModel);
    expect(instance.kitModels).toEqual(TestData.deletedKitModels.results);
    expect(instance.modelsToDelete).toEqual([TestData.kitModel.modelID]);
  });
});
