import { TestData } from '../../test-data';
import { ViewController } from 'ionic-angular';
import { ItemProperties } from '../../constants';
import { NavParamsMock } from '../../mocks';

import { ItemFilterPage } from './item-filter';

let itemFilterPage: ItemFilterPage = null;

describe('ItemFilter Page', () => {

  beforeEach(() => {
    itemFilterPage = new ItemFilterPage(<any> new ViewController, <any> new NavParamsMock);
  });

  it('is created', () => {
    expect(itemFilterPage).not.toBeNull();
  });

  it('gets navParam allElements and initializes filteredElements', () => {
    itemFilterPage.navParams.param = TestData.brands;
    itemFilterPage.ngOnInit();
    expect(itemFilterPage.allElements).toEqual(TestData.brands);
    expect(itemFilterPage.filteredElements).toEqual(TestData.brands)
  });

  it('gets navParam type', () => {
    itemFilterPage.navParams.param = ItemProperties.brand;
    itemFilterPage.ngOnInit();
    expect(itemFilterPage.type).toEqual(ItemProperties.brand);
  });

  it('filters elements on getElements()', () => {
    itemFilterPage.queryText = TestData.queryText;
    itemFilterPage.allElements = TestData.brands;
    itemFilterPage.getElements();
    expect(itemFilterPage.filteredElements).toEqual(TestData.filteredBrands);
  });

  it('does not filter elements if queryText is empty', () => {
    itemFilterPage.queryText = '';
    itemFilterPage.allElements = TestData.brands;
    itemFilterPage.getElements();
    expect(itemFilterPage.filteredElements).toEqual(TestData.brands);
  });

  it('calls viewCtrl.dismiss on dismiss()', () => {
    spyOn(itemFilterPage.viewCtrl, 'dismiss');
    itemFilterPage.dismiss(TestData.brands[0]);
    expect(itemFilterPage.viewCtrl.dismiss).toHaveBeenCalledWith(TestData.brands[0], false);
  });
});
