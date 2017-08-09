import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { ViewItemPage } from './view-item';
import { EditItemPage } from '../edit-item/edit-item';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<ViewItemPage> = null;
let instance: any = null;

describe('ViewItem Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([ViewItemPage]).then(compiled => {
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

  it('gets item', () => {
    instance.navParams.param = TestData.barcode;
    spyOn(instance.itemsService, 'getItem');
    instance.ngOnInit();
    expect(instance.itemsService.getItem).toHaveBeenCalledWith(TestData.barcode);
  });

  it('pushes EditItemPage on nav onEdit()', () => {
    instance.item = Observable.of(TestData.apiItem);
    spyOn(instance.navCtrl, 'push');
    instance.onEditItem();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(EditItemPage, {
      barcode: TestData.apiItem.barcode,
      action: Actions.edit
    });
  });
});
