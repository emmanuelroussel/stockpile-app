import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { ViewKitPage } from './view-kit';
import { EditKitPage } from '../edit-kit/edit-kit';

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

  it('gets kit and kitItems in ngOnInit', fakeAsync(() => {
    instance.navParams.param = TestData.kit;
    instance.kitData.kitItems = TestData.kitItems;
    instance.ngOnInit();
    tick();
    expect(instance.kit).toEqual(TestData.kit);
    expect(instance.kitItems).toEqual(TestData.kitItems.results);
  }));

  it('updates kit name and kitItems when event \'kit:edited\' is published', fakeAsync(() => {
    instance.navParams.param = TestData.kit;
    instance.ngOnInit();
    tick();
    instance.kitItems = [];
    instance.kit = TestData.kit;
    instance.events.publish('kit:edited', TestData.modifiedKit);
    tick();
    expect(instance.kitItems).toEqual(TestData.kitItems.results);
    expect(instance.kit).toEqual(TestData.modifiedKit);
  }));

  it('shows toast is error in getting kitItems', fakeAsync(() => {
    instance.kitData.resolve = false;
    instance.navParams.param = TestData.kit;
    spyOn(instance.notifications, 'showToast');
    instance.ngOnInit();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));

  it('pushes EditKitPage on nav on editKit()', () => {
    instance.kit = TestData.kit;
    instance.kitItems = TestData.kitItems.results;
    spyOn(instance.navCtrl, 'push');
    instance.onEditKit();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditKitPage, { kit: TestData.kit, kitItems: TestData.kitItems.results, action: Actions.edit });
  });
});
