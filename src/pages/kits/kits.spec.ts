import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';
import { Actions } from '../../constants';

import { KitsPage } from './kits';
import { KitPage } from '../kit/kit';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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

  it('gets kits', () => {
    instance.ngOnInit();
    expect(instance.kits).toEqual(Observable.of(TestData.kits));
  });

  it('pushes KitPage on nav on viewKit()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onViewKit(TestData.kit.kitID);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(KitPage, {
      action: Actions.edit,
      kitID: TestData.kit.kitID
    });
  });

  it('pushes KitPage on nav on onAdd()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(KitPage, { action: Actions.add });
  });
});
