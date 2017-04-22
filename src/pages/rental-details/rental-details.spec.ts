import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Messages } from '../../constants';

import { RentalDetailsPage } from './rental-details';

let fixture: ComponentFixture<RentalDetailsPage> = null;
let instance: any = null;

describe('RentalDetails Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([RentalDetailsPage]).then(compiled => {
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

  it('gets navParam items', () => {
    instance.navParams.param = TestData.items;
    instance.ngOnInit();
    expect(instance.items).toBeTruthy();
  });

  it('calls inventoryData.rent for each item', fakeAsync(() => {
    instance.details = TestData.details;
    instance.items = TestData.items;
    spyOn(instance.inventoryData, 'rent').and.callThrough();
    instance.onRent();
    tick();
    expect(instance.inventoryData.rent).toHaveBeenCalledTimes(TestData.items.length);
  }));

  it('goes back to the root\'s nav on successful rent()', fakeAsync(() => {
    instance.details = TestData.details;
    instance.items = TestData.items;
    spyOn(instance.navCtrl, 'popToRoot');
    spyOn(instance.inventoryData, 'rent').and.callThrough();
    spyOn(instance.notifications, 'showToast');
    instance.onRent();
    tick();
    expect(instance.inventoryData.rent).toHaveBeenCalled();
    expect(instance.navCtrl.popToRoot).toHaveBeenCalled();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(Messages.itemsRented);
  }));

  it('shows toast on error onRent()', fakeAsync(() => {
    instance.details = TestData.details;
    instance.inventoryData.resolve = false;
    instance.items = TestData.items;
    spyOn(instance.notifications, 'showToast');
    instance.onRent();
    tick();
    expect(instance.notifications.showToast).toHaveBeenCalledWith(TestData.error);
  }));
});
