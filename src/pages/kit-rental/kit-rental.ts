import { Component } from '@angular/core';
import { NavController, AlertController, Platform, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalDetailsPage } from '../rental-details/rental-details';
import { Actions, Messages } from '../../constants';
import { Notifications } from '../../providers/notifications';

import { Kit } from '../../models/kits';
import { KitModel } from '../../models/kit-models';
import { KitsService } from '../../services/kits.service';
import { KitModelsService } from '../../services/kit-models.service';
import { KitModelsActions } from '../../store/kit-models/kit-models.actions';
import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models/items';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-kit-rental',
  templateUrl: 'kit-rental.html'
})
export class KitRentalPage {
  kit: Observable<Kit>;
  kitModels: Observable<Array<KitModel>>;
  items: Observable<Items>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public barcodeScanner: BarcodeScanner,
    public notifications: Notifications,
    public platform: Platform,
    public navParams: NavParams,
    public kitsService: KitsService,
    public kitModelsService: KitModelsService,
    public kitModelsActions: KitModelsActions,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions
  ) {}

  /**
   * Gets kit, kit models and items.
   */
  ngOnInit() {
    const kitID = this.navParams.get('kitID');

    this.kit = this.kitsService.getKit(kitID);
    this.kitModels = this.kitModelsService.getKitModels(kitID);
    this.items = this.itemsService.getItems();

    this.kitModelsActions.fetchKitModels(kitID);
  }

  /**
   * Tries to add item to rentals.
   */
  onAdd(barcode: string) {
    let items;
    this.items.take(1).subscribe(i => items = i.rentals);

    if (items[barcode]) {
      this.notifications.showMessage(Messages.itemAlreadyAdded);
    } else {
      this.itemsActions.addToRentals(barcode, Actions.rent);
    }
  }

  /**
   * Creates alert to let the user type in a barcode and adds the result.
   */
  onTypeBarcode() {
    let alert = this.alertCtrl.create({
      title: 'Type Barcode',
      inputs: [
        {
          name: 'barcode',
          placeholder: 'Barcode'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Next',
          handler: form => this.onAdd(form.barcode)
        }
      ]
    });

    alert.present();
  }

  /**
   * Starts barcode scanner and process barcode if it is present (i.e. user didn't cancel)
   */
  onScanBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.onAdd(barcodeData.text);
        }
      },
      err => this.notifications.showMessage(err)
    );
  }

  /**
   * Pushes RentalDetailsPage on nav and warns user if some kit models haven't
   * been scanned.
   */
  onContinue() {
    let kitModels;
    this.kitModels.take(1).subscribe(k => kitModels = k);

    // See if user scanned all items in kit
    const remaining = kitModels.find(kitModel => !this.isKitModelAdded(kitModel));

    if (!remaining) {
      this.navCtrl.push(RentalDetailsPage);
    } else {
      let alert = this.alertCtrl.create({
        title: 'You haven\'t scanned all the items in the kit',
        message: 'Are you sure you want to continue?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Continue',
            handler: () => this.navCtrl.push(RentalDetailsPage)
          }
        ]
      });

      alert.present();
    }
  }

  /**
   * Returns whether there is an item corresponding to the kit model that has
   * been added to the rentals or not.
   */
  isKitModelAdded(kitModel: KitModel) {
    let items;
    this.items.take(1).subscribe(i => items = Object.keys(i.rentals).map((key) => i.rentals[key]));
    return items.find(item => kitModel.brandID === item.brandID && kitModel.modelID === item.modelID);
  }

  /**
   * Returns items added to rentals, but not in the kit that is being rented.
   */
  getItemsNotInKit() {
    let kitModels;
    let items;
    this.kitModels.take(1).subscribe(k => kitModels = k);
    this.items.take(1).subscribe(i => items = Object.keys(i.rentals).map((key) => i.rentals[key]));
    return items.filter(item => !kitModels.find(kitModel => {
      return kitModel.brandID === item.brandID && kitModel.modelID === item.modelID;
    }));
  }

  /**
   * Finds the item corresponding to the kit model and removes it from rentals.
   */
  onRemoveKitModel(kitModel: KitModel) {
    let items;
    this.items.take(1).subscribe(i => items = Object.keys(i.rentals).map((key) => i.rentals[key]));
    let item = items.find(item => kitModel.brandID === item.brandID && kitModel.modelID === item.modelID);

    this.itemsActions.removeFromRentals(item.barcode);
  }

  /**
   * Removes item from rentals.
   */
  onRemoveItem(barcode: string) {
    this.itemsActions.removeFromRentals(barcode);
  }
}
