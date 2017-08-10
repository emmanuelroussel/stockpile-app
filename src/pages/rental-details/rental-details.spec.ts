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

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('initializes end date to tomorrow', () => {
    let tomorrow = new Date();
    tomorrow.setDate((new Date()).getDate() + 1);
    instance.ngOnInit();
    expect(instance.details.endDate.substring(0, 10)).toEqual(tomorrow.toISOString().substring(0, 10));
  });

  it('rents items', () => {
    const form = { value: TestData.details };
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'rentItems');
    instance.onRent(form);
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.rentingItems);
    expect(instance.itemsActions.rentItems).toHaveBeenCalledWith({
      ...TestData.details,
      startDate: (new Date()).toISOString().substring(0, 10)
    });
  });
});
