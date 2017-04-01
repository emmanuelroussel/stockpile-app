import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import { NavParamsMock, AlertMock } from '../../mocks';

import { ItemFilterPage } from './item-filter';
import { ItemProperties } from '../../constants';

let itemFilterPage: ItemFilterPage = null;

describe('ItemFilter Page', () => {

  beforeEach(() => {
    itemFilterPage = new ItemFilterPage(
      <any> new ViewController,
      <any> new NavParamsMock,
      <any> new AlertMock
    );
  });

  it('is created', () => {
    expect(itemFilterPage).toBeTruthy();
  });

  it('gets navParam elements', () => {
    itemFilterPage.navParams.param = TestData.brands.results;
    itemFilterPage.ngOnInit();
    expect(itemFilterPage.allElements).toEqual(TestData.brands.results);
    expect(itemFilterPage.filteredElements).toEqual(TestData.brands.results);
  });

  it('gets navParam type', () => {
    itemFilterPage.navParams.param = ItemProperties.brand;
    itemFilterPage.ngOnInit();
    expect(itemFilterPage.type).toEqual(ItemProperties.brand);
  });

  it('filters elements on getElements()', () => {
    itemFilterPage.queryText = TestData.queryText;
    itemFilterPage.allElements = TestData.brands.results;
    itemFilterPage.getElements();
    expect(itemFilterPage.filteredElements).toEqual(TestData.filteredBrands);
  });

  it('does not filter elements if queryText is empty', () => {
    itemFilterPage.queryText = '';
    itemFilterPage.allElements = TestData.brands.results;
    itemFilterPage.getElements();
    expect(itemFilterPage.filteredElements).toEqual(TestData.brands.results);
  });

  it('sets showNew to true if there is no match', () => {
    itemFilterPage.queryText = TestData.queryText;
    itemFilterPage.allElements = TestData.models.results;
    itemFilterPage.getElements();
    expect(itemFilterPage.showNew).toEqual(true);
  });

  it('calls viewCtrl.dismiss on dismiss()', () => {
    spyOn(itemFilterPage.viewCtrl, 'dismiss');
    itemFilterPage.dismiss(TestData.brands[0]);
    expect(itemFilterPage.viewCtrl.dismiss).toHaveBeenCalledWith(TestData.brands[0], false);
  });

  it('creates an alert onCreate()', () => {
    spyOn(itemFilterPage.alertCtrl, 'create').and.callThrough();
    itemFilterPage.type = '';
    itemFilterPage.onCreate();
    expect(itemFilterPage.alertCtrl.create).toHaveBeenCalled();
  });
});
