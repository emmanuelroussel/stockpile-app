import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, LoadingMessages } from '../../constants';

import { KitPage } from './kit';
import { AddKitModelPage } from '../add-kit-model/add-kit-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let fixture: ComponentFixture<KitPage> = null;
let instance: any = null;

describe('Kit Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([KitPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  const updateForm = (name: string) => {
    instance.kitForm.controls['name'].setValue(name);
  }

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

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(TestData.kit.name);
    expect(instance.kitForm.value).toEqual({ name: TestData.kit.name });
  });

  it('validates name', () => {
    instance.ngOnInit();
    updateForm('');
    expect(instance.kitForm.controls.name.valid).toEqual(false);
    updateForm(TestData.kit.name);
    expect(instance.kitForm.controls.name.valid).toEqual(true);
  });

  it('creates an alert if there are no kit models onSave()', () => {
    instance.kitForm = { valid: true };
    instance.kitModels = Observable.of([]);
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onSave();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('sets blur to true onSave()', () => {
    instance.kitForm = { valid: false };
    instance.onSave();
    expect(instance.blur.name).toEqual(true);
  });

  it('creates kit onSave() if action is add', () => {
    instance.kitForm = {
      value: { name: TestData.kit.name },
      valid: true
    };
    instance.action = Actions.add;
    instance.kitModels = Observable.of([TestData.kitModel.modelID]);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'createKit');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingKit);
    expect(instance.kitsActions.createKit).toHaveBeenCalledWith({ name: TestData.kit.name });
  });

  it('updates kit onSave() if action is edit', () => {
    instance.kitForm = {
      value: { name: TestData.kit.name },
      valid: true
    };
    instance.action = Actions.edit;
    instance.kit = Observable.of(TestData.kit);
    instance.kitModels = Observable.of([TestData.kitModel.modelID]);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.kitsActions, 'updateKit');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingKit);
    expect(instance.kitsActions.updateKit).toHaveBeenCalledWith({
      name: TestData.kit.name,
      kitID: TestData.kit.kitID
    });
  });

  it('it does not save kit onSave() if the form is invalid', () => {
    instance.kitForm = { valid: false };
    spyOn(instance.kitsActions, 'updateKit');
    spyOn(instance.kitsActions, 'createKit');
    instance.onSave();
    expect(instance.kitsActions.updateKit).not.toHaveBeenCalled();
    expect(instance.kitsActions.createKit).not.toHaveBeenCalled();
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

  it('gets name', () => {
    instance.kitForm = {
      get: (key: string) => TestData.kit[key]
    };
    expect(instance.name).toEqual(TestData.kit.name);
  });
});
