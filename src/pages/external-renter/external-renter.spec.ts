import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions, LoadingMessages } from '../../constants';

import { ExternalRenterPage } from './external-renter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let fixture: ComponentFixture<ExternalRenterPage> = null;
let instance: any = null;

describe('ExternalRenter Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ExternalRenterPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  const updateForm = (name: string, email: string, phone: number) => {
    instance.externalRenterForm.controls['name'].setValue(name);
    instance.externalRenterForm.controls['email'].setValue(email);
    instance.externalRenterForm.controls['phone'].setValue(phone);
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

  it('updates form with values', () => {
    instance.ngOnInit();
    updateForm(
      TestData.externalRenter.name,
      TestData.externalRenter.email,
      TestData.externalRenter.phone
    );
    expect(instance.externalRenterForm.value).toEqual({
      name: TestData.externalRenter.name,
      email: TestData.externalRenter.email,
      phone: TestData.externalRenter.phone
    });
  });

  it('validates name', () => {
    instance.ngOnInit();
    updateForm('');
    expect(instance.externalRenterForm.controls.name.valid).toEqual(false);
    updateForm(TestData.externalRenter.name);
    expect(instance.externalRenterForm.controls.name.valid).toEqual(true);
  });

  it('sets blur to true onSave()', () => {
    instance.externalRenterForm = { valid: false };
    instance.onSave();
    expect(instance.blur).toEqual({
      name: true,
      email: true,
      phone: true
    });
  });

  it('creates external renter onSave() if action is add', () => {
    instance.externalRenterForm = {
      value: {
        name: TestData.externalRenter.name,
        email: TestData.externalRenter.email,
        phone: TestData.externalRenter.phone
      },
      valid: true
    };
    instance.action = Actions.add;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.externalRentersActions, 'createExternalRenter');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.creatingExternalRenter);
    expect(instance.externalRentersActions.createExternalRenter).toHaveBeenCalledWith({
      name: TestData.externalRenter.name,
      email: TestData.externalRenter.email,
      phone: TestData.externalRenter.phone
    }, true);
  });

  it('updates external renter onSave() if action is edit', () => {
    instance.externalRenterForm = {
      value: {
        name: TestData.externalRenter.name,
        email: TestData.externalRenter.email,
        phone: TestData.externalRenter.phone
      },
      valid: true
    };
    instance.action = Actions.edit;
    instance.externalRenter = Observable.of(TestData.externalRenter);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.externalRentersActions, 'updateExternalRenter');
    instance.onSave();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.updatingExternalRenter);
    expect(instance.externalRentersActions.updateExternalRenter).toHaveBeenCalledWith({
      name: TestData.externalRenter.name,
      email: TestData.externalRenter.email,
      phone: TestData.externalRenter.phone,
      externalRenterID: TestData.externalRenter.externalRenterID
    });
  });

  it('it does not save kit onSave() if the form is invalid', () => {
    instance.externalRenterForm = { valid: false };
    spyOn(instance.externalRentersActions, 'updateExternalRenter');
    spyOn(instance.externalRentersActions, 'createExternalRenter');
    instance.onSave();
    expect(instance.externalRentersActions.updateExternalRenter).not.toHaveBeenCalled();
    expect(instance.externalRentersActions.createExternalRenter).not.toHaveBeenCalled();
  });

  it('creates an alert onDelete()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onDelete();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('deletes external renter on deleteExternalRenter()', () => {
    instance.externalRenter = Observable.of(TestData.externalRenter);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.externalRentersActions, 'deleteExternalRenter');
    instance.deleteExternalRenter();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.deletingExternalRenter);
    expect(instance.externalRentersActions.deleteExternalRenter).toHaveBeenCalledWith(TestData.externalRenter.externalRenterID);
  });

  it('gets name', () => {
    instance.externalRenterForm = {
      get: (key: string) => TestData.externalRenter[key]
    };
    expect(instance.name).toEqual(TestData.externalRenter.name);
  });

  it('gets email', () => {
    instance.externalRenterForm = {
      get: (key: string) => TestData.externalRenter[key]
    };
    expect(instance.email).toEqual(TestData.externalRenter.email);
  });

  it('gets phone', () => {
    instance.externalRenterForm = {
      get: (key: string) => TestData.externalRenter[key]
    };
    expect(instance.phone).toEqual(TestData.externalRenter.phone);
  });
});
