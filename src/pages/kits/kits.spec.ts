import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { KitsPage } from './kits';
import { ViewKitPage } from '../view-kit/view-kit';
import { EditKitPage } from '../edit-kit/edit-kit';

let fixture: ComponentFixture<KitsPage> = null;
let instance: any = null;

describe('Kits Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([KitsPage]).then(compiled => {
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

  it('gets kits in ngOnInit', fakeAsync(() => {
    instance.inventoryData.kits = TestData.kits;
    instance.ngOnInit();
    tick();
    expect(instance.kits).toEqual(TestData.kits.results);
  }));

  it('gets kits on loadKits()', fakeAsync(() => {
    spyOn(instance.inventoryData, 'getKits').and.callThrough();
    instance.loadKits();
    tick();
    expect(instance.kits).toEqual(TestData.kits.results);
  }));

  it('sets loadMoreItems to false if not kits returned in loadKits()', fakeAsync(() => {
    instance.inventoryData.kits = { results: [] };
    instance.loadMoreItems = true;
    instance.loadKits();
    tick();
    expect(instance.loadMoreItems).toEqual(false);
  }));

  it('shows toast if error on loadKits()', fakeAsync(() => {
    spyOn(instance.notifications, 'showToast');
    instance.inventoryData.resolve = false;
    instance.loadKits();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes ViewKitPage on nav on viewKit()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onViewKit(TestData.kit);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ViewKitPage, { kit: TestData.kit });
  });

  it('pushes EditKitPage on nav on onAdd()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditKitPage, { action: Actions.add });
  });
});
