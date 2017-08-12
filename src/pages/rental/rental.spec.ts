import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Actions, Messages, LoadingMessages } from '../../constants';
import { TestData } from '../../test-data';

import { RentalPage } from './rental';
import { RentalDetailsPage } from '../rental-details/rental-details';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<RentalPage> = null;
let instance: any = null;

describe('Rental Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([RentalPage]).then(compiled => {
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

  it('gets navParam action', () => {
    instance.navParams.param = Actions.rent;
    instance.ngOnInit();
    expect(instance.action).toEqual(Actions.rent);
  });

  it('adds item to rentals onAdd()', () => {
    instance.items = Observable.of({ rentals: TestData.itemsMap });
    instance.action = Actions.rent;
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'addToRentals');
    instance.onAdd('');
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.addingToRentals);
    expect(instance.itemsActions.addToRentals).toHaveBeenCalledWith('', Actions.rent);
  });

  it('shows message if item is already added', () => {
    instance.items = Observable.of({ rentals: TestData.itemsMap });
    spyOn(instance.notifications, 'showMessage');
    instance.onAdd(TestData.barcode);
    expect(instance.notifications.showMessage).toHaveBeenCalledWith(Messages.itemAlreadyAdded);
  });

  it('pushes RentalDetailsPage on nav onContinue() if items are added', () => {
    instance.items = Observable.of({ rentals: TestData.itemsMap });
    spyOn(instance.navCtrl, 'push');
    instance.onContinue();
    expect(instance.navCtrl.push).toHaveBeenCalledWith(RentalDetailsPage);
  });

  it('shows alert onContinue() is rental is empty', () => {
    instance.items = Observable.of({ rentals: {} });
    spyOn(instance, 'alertEmptyRental');
    instance.onContinue();
    expect(instance.alertEmptyRental).toHaveBeenCalled();
  });

  it('returns item with today\'s date onReturn if items are added', () => {
    instance.items = Observable.of({ rentals: TestData.itemsMap });
    const today = new Date().toISOString().substring(0, 10);
    spyOn(instance.layoutActions, 'showLoadingMessage');
    spyOn(instance.itemsActions, 'returnItems');
    instance.onReturn();
    expect(instance.layoutActions.showLoadingMessage).toHaveBeenCalledWith(LoadingMessages.returningItems);
    expect(instance.itemsActions.returnItems).toHaveBeenCalledWith(today);
  });

  it('shows alert onReturn() is rental is empty', () => {
    instance.items = Observable.of({ rentals: {} });
    spyOn(instance, 'alertEmptyRental');
    instance.onReturn();
    expect(instance.alertEmptyRental).toHaveBeenCalled();
  });

  it('creates an alert on alertEmptyRental()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.alertEmptyRental();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('calls barcodeScanner.scan() onScanBarcode()', fakeAsync(() => {
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance, 'onAdd');
    instance.onScanBarcode();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.onAdd).toHaveBeenCalledWith(TestData.barcodeData.text);
  }));

  it('shows toast if error in onScanBarcode()', fakeAsync(() => {
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showMessage');
    instance.onScanBarcode();
    tick();
    expect(instance.notifications.showMessage).toHaveBeenCalledWith(TestData.error);
  }));

  it('it does nothing if scan is cancelled', fakeAsync(() => {
    instance.barcodeScanner.cancel = true;
    spyOn(instance.notifications, 'showMessage');
    spyOn(instance, 'onAdd');
    instance.onScanBarcode();
    tick();
    expect(instance.onAdd).not.toHaveBeenCalled();
    expect(instance.notifications.showMessage).not.toHaveBeenCalled();
  }));

  it('creates an alert onTypeBarcode()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onTypeBarcode();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('removes item from the list onRemoveItem()', () => {
    spyOn(instance.itemsActions, 'removeFromRentals');
    instance.onRemoveItem(TestData.barcode);
    expect(instance.itemsActions.removeFromRentals).toHaveBeenCalledWith(TestData.barcode);
  });
});
