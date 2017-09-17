import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { LoadingMessages } from '../../constants';

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

  const updateForm = (endDate: string, notes: string = '') => {
    instance.rentalForm.controls['endDate'].setValue(endDate);
    instance.rentalForm.controls['notes'].setValue(notes);
  }

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('initializes end date to tomorrow', () => {
    let tomorrow = new Date();
    tomorrow.setDate((new Date()).getDate() + 1);
    instance.ngOnInit();
    expect(instance.rentalForm.value.endDate.substring(0, 10)).toEqual(tomorrow.toISOString().substring(0, 10));
  });

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(TestData.details.endDate, TestData.details.notes);
    expect(instance.rentalForm.value).toEqual({
      endDate: TestData.details.endDate,
      notes: TestData.details.notes
    });
  });

  it('validates endDate', () => {
    instance.ngOnInit();
    updateForm('');
    expect(instance.rentalForm.controls.endDate.valid).toEqual(false);
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    updateForm(yesterday.toISOString());
    expect(instance.rentalForm.controls.endDate.valid).toEqual(false);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    updateForm(tomorrow.toISOString());
    expect(instance.rentalForm.controls.endDate.valid).toEqual(true);
  });

  it('rents items', () => {
    instance.rentalForm = {
      value: TestData.details,
      valid: true
    };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'rentItems');
    instance.onRent();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.rentingItems);
    expect(instance.itemsActions.rentItems).toHaveBeenCalledWith({
      ...TestData.details,
      startDate: (new Date()).toISOString().substring(0, 10)
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

  it('gets endDate', () => {
    instance.rentalForm = {
      get: (key: string) => TestData.details[key]
    };
    expect(instance.endDate).toEqual(TestData.details.endDate);
  });
});
