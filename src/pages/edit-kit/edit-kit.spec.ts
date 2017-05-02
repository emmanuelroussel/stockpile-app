import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, Messages } from '../../constants';

import { EditKitPage } from './edit-kit';
import { AddKitItemPage } from '../add-kit-item/add-kit-item';

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
    instance.navParams.param = Actions.edit;
    instance.ngOnInit();
    instance.kitItems = TestData.kitItems.results;
    instance.events.publish('kit-item:added', TestData.kitItem);
    expect(instance.kitItems).toEqual(TestData.addedKitItems.results);
    expect(instance.modelsToCreate).toEqual([TestData.kitItem.modelID]);
  });

  it('adds kit onSave() if action is add', fakeAsync(() => {
    instance.action = Actions.add;
    instance.kit = TestData.kit;
    spyOn(instance.inventoryData, 'addKit').and.callThrough();
    spyOn(instance ,'saveKitItems');
    instance.onSave();
    tick();
    expect(instance.inventoryData.addKit).toHaveBeenCalledWith(TestData.kit.name);
    expect(instance.saveKitItems).toHaveBeenCalledWith(TestData.response, Messages.kitAdded, 'kit:added');
  }));

  it('edits kit onSave() if action is edit', fakeAsync(() => {
    instance.action = Actions.edit;
    instance.kit = TestData.kit;
    spyOn(instance.inventoryData, 'editKit').and.callThrough();
    spyOn(instance ,'saveKitItems');
    instance.onSave();
    tick();
    expect(instance.inventoryData.editKit).toHaveBeenCalledWith(TestData.kit);
    expect(instance.saveKitItems).toHaveBeenCalledWith(TestData.response, Messages.kitEdited, 'kit:edited');
  }));

  it('shows toast if error onSave()', fakeAsync(() => {
    instance.action = Actions.add;
    instance.kit = TestData.kit;
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onSave();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('adds kitItems on saveKitItems() if action is add', fakeAsync(() => {
    spyOn(instance.inventoryData, 'addKitItem').and.callThrough();
    spyOn(instance.events, 'publish');
    spyOn(instance.navCtrl, 'pop');
    spyOn(instance.notifications, 'showToast');
    instance.kit = TestData.kit;
    instance.action = Actions.add;
    instance.kitItems = TestData.kitItems.results;
    instance.saveKitItems(TestData.kit, Messages.kitAdded, 'kit:added');
    tick();
    expect(instance.inventoryData.addKitItem).toHaveBeenCalledTimes(TestData.kitItems.results.length);
    expect(instance.events.publish).toHaveBeenCalledWith('kit:added', TestData.kit);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.kitAdded);
  }));

  it('edits kitItems on saveKitItems() if action is edit', fakeAsync(() => {
    spyOn(instance.inventoryData, 'addKitItem').and.callThrough();
    spyOn(instance.inventoryData, 'deleteKitItem').and.callThrough();
    spyOn(instance.events, 'publish');
    spyOn(instance.navCtrl, 'pop');
    spyOn(instance.notifications, 'showToast');
    instance.kit = TestData.kit;
    instance.action = Actions.edit;
    instance.modelsToCreate = TestData.modelsToCreate;
    instance.modelsToDelete = TestData.modelsToDelete;
    instance.saveKitItems(TestData.kit, Messages.kitEdited, 'kit:edited');
    tick();
    expect(instance.inventoryData.addKitItem).toHaveBeenCalledTimes(TestData.modelsToCreate.length);
    expect(instance.inventoryData.deleteKitItem).toHaveBeenCalledTimes(TestData.modelsToDelete.length);
    expect(instance.events.publish).toHaveBeenCalledWith('kit:edited', TestData.kit);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.kitEdited);
  }));

  it('shows toast if error on saveKitItems()', fakeAsync(() => {
    spyOn(instance.notifications, 'showToast');
    instance.kit = TestData.kit;
    instance.action = Actions.add;
    instance.kitItems = TestData.kitItems.results;
    instance.inventoryData.resolve = false;
    instance.saveKitItems(TestData.kit, Messages.kitAdded, 'kit:added');
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('deletes kit onDelete()', fakeAsync(() => {
    spyOn(instance.inventoryData, 'deleteKit').and.callThrough();
    spyOn(instance.notifications, 'showToast');
    spyOn(instance.events, 'publish');
    spyOn(instance.navCtrl, 'pop');
    instance.kit = TestData.kit;
    instance.onDelete();
    tick();
    expect(instance.inventoryData.deleteKit).toHaveBeenCalledWith(TestData.kit.kitID);
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.kitDeleted);
    expect(instance.events.publish).toHaveBeenCalledWith('kit:deleted', TestData.kit);
    expect(instance.navCtrl.pop).toHaveBeenCalled();
  }));

  it('shows toast if error onDelete()', fakeAsync(() => {
    instance.inventoryData.resolve = false;
    spyOn(instance.notifications, 'showToast');
    instance.onDelete();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes AddKitItemPage on addItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAddItem();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(AddKitItemPage);
  });

  it('adds modelID to modelsToDelete onRemoveKitItem()', () => {
    instance.kitItems = TestData.kitItems.results;
    instance.onRemoveFromList(0, TestData.kitItem);
    expect(instance.modelsToDelete).toEqual([TestData.kitItem.modelID]);
  });
});
