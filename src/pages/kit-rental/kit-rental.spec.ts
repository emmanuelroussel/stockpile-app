import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Messages, Actions } from '../../constants';
import { TestData } from '../../test-data';

import { KitRentalPage } from './kit-rental';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<KitRentalPage> = null;
let instance: any = null;

describe('KitRental Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([KitRentalPage]).then(compiled => {
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

  it('fetches kitModels', () => {
    instance.navParams.param = TestData.kit.kitID;
    spyOn(instance.kitModelsActions, 'fetchKitModels');
    instance.ngOnInit();
    expect(instance.kitModelsActions.fetchKitModels).toHaveBeenCalledWith(TestData.kit.kitID);
  });

  it('shows message if item is already added', () => {
    instance.items = Observable.of({
      rentals: {
        [TestData.items[0].barcode]: TestData.items[0]
      }
    });
    spyOn(instance.notifications, 'showMessage');
    instance.onAdd(TestData.items[0].barcode);
    expect(instance.notifications.showMessage).toHaveBeenCalledWith(Messages.itemAlreadyAdded);
  });

  it('adds item to rentals if not already added', () => {
    instance.items = Observable.of({ rentals: [] });
    spyOn(instance.itemsActions, 'addToRentals');
    instance.onAdd(TestData.item.barcode);
    expect(instance.itemsActions.addToRentals).toHaveBeenCalledWith(TestData.item.barcode, Actions.rent);
  });

  it('creates an alert onTypeBarcode()', () => {
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onTypeBarcode();
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

  it('shows message if error in onScanBarcode()', fakeAsync(() => {
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

  it('pushes RentalDetailsPage on nav onContinue()', () => {
    instance.kitModels = Observable.of(TestData.kitModels.results);
    instance.items = Observable.of({ rentals: TestData.kitModels.results });
    spyOn(instance.navCtrl, 'push');
    instance.onContinue();
    expect(instance.navCtrl.push).toHaveBeenCalled();
  });

  it('shows alert if not all kitModels are scanned onContinue()', () => {
    instance.kitModels = Observable.of(TestData.kitModels.results);
    instance.items = Observable.of({ rentals: TestData.deletedKitModels.results });
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onContinue();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('returns true if kit model is added on isKitModelAdded()', () => {
    instance.items = Observable.of({ rentals: TestData.kitModels.results });
    const remaining = instance.isKitModelAdded(TestData.kitModels.results[0]);
    expect(remaining).toBeTruthy();
  });

  it('removes item from rentals on onRemoveKitModel()', () => {
    instance.items = Observable.of({ rentals: TestData.itemsMap });
    spyOn(instance.itemsActions, 'removeFromRentals');
    instance.onRemoveKitModel(TestData.kitModel);
    expect(instance.itemsActions.removeFromRentals).toHaveBeenCalledWith(TestData.items[3].barcode);
  });

  it('removes item from rentals on onRemoveItem()', () => {
    spyOn(instance.itemsActions, 'removeFromRentals');
    instance.onRemoveItem(TestData.barcode);
    expect(instance.itemsActions.removeFromRentals).toHaveBeenCalledWith(TestData.barcode);
  });
});
