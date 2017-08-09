import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, LoadingMessages } from '../../constants';

import { EditKitPage } from './edit-kit';
import { AddKitItemPage } from '../add-kit-item/add-kit-item';
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

  it('adds a kitItem if event \'kit-item:added\' is published', () => {
    instance.ngOnInit();
    instance.kitModels = TestData.kitItems.results.slice();
    instance.events.publish('kit-item:added', TestData.kitItem);
    expect(instance.kitModels).toEqual(TestData.addedKitItems.results);
    expect(instance.modelsToCreate).toEqual([TestData.kitItem.modelID]);
  });

  it('gets kit models if action is edit', () => {
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    expect(instance.kitModels).toEqual(TestData.kitItems.results);
  });

  it('creates kit onSave() if action is add', () => {
    const form = {
      value: {
        name: TestData.kit.name
      }
    };
    instance.action = Actions.add;
    instance.modelsToCreate = [TestData.kitItem.modelID];
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'createKit');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingKit);
    expect(instance.kitsActions.createKit).toHaveBeenCalledWith(form.value, [TestData.kitItem.modelID]);
  });

  it('updates kit onSave() if action is edit', () => {
    const form = {
      value: {
        name: TestData.kit.name
      }
    };
    instance.action = Actions.edit;
    instance.kit = Observable.of(TestData.kit);
    instance.modelsToCreate = [TestData.kitItem.modelID];
    instance.modelsToDelete = [TestData.kitItems.results[0]];
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'updateKit');
    instance.onSave(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingKit);
    expect(instance.kitsActions.updateKit).toHaveBeenCalledWith(
      { name: TestData.kit.name, kitID: TestData.kit.kitID },
      [TestData.kitItem.modelID],
      [TestData.kitItems.results[0]]
    );
  });

  it('deletes item onDelete()', () => {
    instance.kit = Observable.of(TestData.kit);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'deleteKit');
    instance.onDelete();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingKit);
    expect(instance.kitsActions.deleteKit).toHaveBeenCalledWith(TestData.kit.kitID);
  });

  it('pushes AddKitItemPage onAddItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAddItem();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(AddKitItemPage);
  });

  it('removes kit models onRemoveFromList()', () => {
    instance.kitModels = TestData.kitItems.results.slice();
    instance.onRemoveFromList(0, TestData.kitItem);
    expect(instance.kitModels).toEqual(TestData.deletedKitItems.results);
    expect(instance.modelsToDelete).toEqual([TestData.kitItem.modelID]);
  });
});
