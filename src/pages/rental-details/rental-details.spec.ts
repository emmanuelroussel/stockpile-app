import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { LoadingMessages, ItemProperties } from '../../constants';
import { dateToMySQLFormat } from '../../utils';

import { ItemFilterPage } from '../item-filter/item-filter';
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

  const updateForm = (end: string, notes: string = '') => {
    instance.rentalForm.controls['end'].setValue(end);
    instance.rentalForm.controls['notes'].setValue(notes);
  }

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('initializes end date to tomorrow', () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - instance.timezoneOffset + 1);
    instance.ngOnInit();
    expect(instance.rentalForm.value.end.substring(0, 10)).toEqual(tomorrow.toISOString().substring(0, 10));
  });

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(TestData.details.end, TestData.details.notes);
    expect(instance.rentalForm.value).toEqual({
      end: TestData.details.end,
      notes: TestData.details.notes
    });
  });

  it('validates endDate', () => {
    instance.ngOnInit();
    updateForm('');
    expect(instance.rentalForm.controls.end.valid).toEqual(false);
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    updateForm(yesterday.toISOString());
    expect(instance.rentalForm.controls.end.valid).toEqual(false);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    updateForm(tomorrow.toISOString());
    expect(instance.rentalForm.controls.end.valid).toEqual(true);
  });

  it('rents items', () => {
    instance.rentalForm = {
      value: TestData.details,
      valid: true
    };
    instance.externalRenter = TestData.externalRenter;
    const today = new Date();
    jasmine.clock().mockDate(today);
    let endDate = new Date(TestData.details.end);
    endDate.setDate(endDate.getDate() + instance.timezoneOffset);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'rentItems');
    instance.onRent();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.rentingItems);
    expect(instance.itemsActions.rentItems).toHaveBeenCalledWith({
      ...TestData.details,
      externalRenterID: TestData.externalRenter.externalRenterID,
      start: dateToMySQLFormat(today),
      end: dateToMySQLFormat(endDate)
    });
  });

  it('rents items without external renter', () => {
    instance.rentalForm = {
      value: TestData.details,
      valid: true
    };
    const today = new Date();
    jasmine.clock().mockDate(today);
    let endDate = new Date(TestData.details.end);
    endDate.setDate(endDate.getDate() + instance.timezoneOffset);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'rentItems');
    instance.onRent();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.rentingItems);
    expect(instance.itemsActions.rentItems).toHaveBeenCalledWith({
      ...TestData.details,
      externalRenterID: null,
      start: dateToMySQLFormat(today),
      end: dateToMySQLFormat(endDate)
    });
  });

  it('does not rent items if form is invalid', () => {
    instance.rentalForm = { valid: false };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'rentItems');
    instance.onRent();
    expect(instance.layoutActions.showLoadingMessage).not.toHaveBeenCalled();
    expect(instance.itemsActions.rentItems).not.toHaveBeenCalled();
  });

  it('creates a modal on onSelectExternalRenter()', () => {
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onSelectExternalRenter();
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(ItemFilterPage, {
      type: ItemProperties.externalRenter
    });
  });

  it('gets end', () => {
    instance.rentalForm = {
      get: (key: string) => TestData.details[key]
    };
    expect(instance.end).toEqual(TestData.details.end);
  });
});
