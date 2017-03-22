import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import { NavParamsMock } from '../../mocks';

import { ItemFilterPage } from './item-filter';
import { ItemProperties } from '../../constants';

let itemFilterPage: ItemFilterPage = null;

describe('ItemFilter Page', () => {

  beforeEach(() => {
    itemFilterPage = new ItemFilterPage(<any> new ViewController, <any> new NavParamsMock);
  });

  it('is created', () => {
    expect(itemFilterPage).not.toBeNull();
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

  it('calls viewCtrl.dismiss on dismiss()', () => {
    spyOn(itemFilterPage.viewCtrl, 'dismiss');
    itemFilterPage.dismiss(TestData.brands[0]);
    expect(itemFilterPage.viewCtrl.dismiss).toHaveBeenCalledWith(TestData.brands[0], false);
  });
});
