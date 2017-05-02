import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import { NavParamsMock, AlertMock } from '../../mocks';

import { ItemFilterPage } from './item-filter';
import { ItemProperties } from '../../constants';

let instance: ItemFilterPage = null;

describe('ItemFilter Page', () => {

  beforeEach(() => {
    instance = new ItemFilterPage(
      <any> new ViewController,
      <any> new NavParamsMock,
      <any> new AlertMock
    );
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('gets navParam elements', () => {
    instance.navParams.param = TestData.brands.results;
    instance.ngOnInit();
    expect(instance.allElements).toEqual(TestData.brands.results);
    expect(instance.filteredElements).toEqual(TestData.brands.results);
  });

  it('gets navParam type', () => {
    instance.navParams.param = ItemProperties.brand;
    instance.ngOnInit();
    expect(instance.type).toEqual(ItemProperties.brand);
  });

  it('filters elements on getElements()', () => {
    instance.queryText = TestData.queryText;
    instance.allElements = TestData.brands.results;
    instance.onGetElements();
    expect(instance.filteredElements).toEqual(TestData.filteredBrands);
  });

  it('does not filter elements if queryText is empty', () => {
    instance.queryText = '';
    instance.allElements = TestData.brands.results;
    instance.onGetElements();
    expect(instance.filteredElements).toEqual(TestData.brands.results);
  });

  it('sets showNew to true if there is no match', () => {
    instance.queryText = TestData.queryText;
    instance.allElements = TestData.models.results;
    instance.onGetElements();
    expect(instance.showNew).toEqual(true);
  });

  it('calls viewCtrl.dismiss on dismiss()', () => {
    spyOn(instance.viewCtrl, 'dismiss');
    instance.onDismiss(TestData.brands[0]);
    expect(instance.viewCtrl.dismiss).toHaveBeenCalledWith(TestData.brands[0], false);
  });

  it('creates an alert onCreate()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.type = '';
    instance.onCreate();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });
});
