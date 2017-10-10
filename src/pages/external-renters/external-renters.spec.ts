import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { ExternalRentersPage } from './external-renters';
import { EditExternalRenterPage } from '../edit-external-renter/edit-external-renter';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<ExternalRentersPage> = null;
let instance: any = null;

describe('ExternalRenters Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ExternalRentersPage]).then(compiled => {
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

  it('gets external renters', () => {
    spyOn(instance.externalRentersActions, 'fetchExternalRenters');
    instance.ngOnInit();
    expect(instance.externalRentersActions.fetchExternalRenters).toHaveBeenCalled();
  });

  it('pushes EditExternalRenterPage on nav onViewExternalRenter()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onViewExternalRenter(TestData.externalRenter.externalRenterID);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditExternalRenterPage, {
      action: Actions.edit,
      externalRenterID: TestData.externalRenter.externalRenterID
    });
  });

  it('pushes EditExternalRenterPage on nav on add()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditExternalRenterPage, {
      action: Actions.add,
    });
  });
});
