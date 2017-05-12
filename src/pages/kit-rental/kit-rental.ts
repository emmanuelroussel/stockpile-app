import { Component } from '@angular/core';
import { NavController, AlertController, Platform, NavParams, Events } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalDetailsPage } from '../rental-details/rental-details';
import { Messages } from '../../constants';
import { Notifications } from '../../providers/notifications';
import { ItemData } from '../../providers/item-data';
import { KitData } from '../../providers/kit-data';

@Component({
  selector: 'page-kit-rental',
  templateUrl: 'kit-rental.html'
})
export class KitRentalPage {
  kit;
  kitItems = [];
  items = [];
  otherItems = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public notifications: Notifications,
    public itemData: ItemData,
    public barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public kitData: KitData,
    public navParams: NavParams,
    public events: Events
  ) { }

  /**
   * Gets kit and kit items from api.
   */
  ngOnInit() {
    const kitID = this.navParams.get('kitID');

    this.kitData.getKit(kitID).subscribe(
      kit => this.kit = kit,
      err => this.notifications.showToast(err)
    );

    this.kitData.getKitItems(kitID).subscribe(
      kitItems => this.kitItems = kitItems.results,
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Checks if item can be added to the rental. Shows why if not, adds it if yes.
   */
  onAdd(barcode: string) {
    this.itemData.getItem(barcode).subscribe(
      item => {
        if (item.available === 0) {
          this.notifications.showToast(Messages.itemAlreadyRented);
        } else if (this.items.some(listItem => listItem.barcode === item.barcode)) {
          this.notifications.showToast(Messages.itemAlreadyAdded);
        } else if (!this.kitItems.some(kitItem => kitItem.brandID === item.brandID && kitItem.modelID === item.modelID)) {
          let alert = this.alertCtrl.create({
            title: 'Item not in kit',
            message: 'Are you sure you want to rent it with this kit?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel'
              },
              {
                text: 'Yes',
                handler: () => {
                  this.items.push(item);
                  this.otherItems.push(item);
                }
              }
            ]
          });

          alert.present();
        } else {
          this.items.push(item);
          const index = this.kitItems.findIndex(kitItem => kitItem.brandID === item.brandID && kitItem.modelID === item.modelID);
          this.kitItems[index].barcode = item.barcode;
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Creates alert to let the user type in a barcode. Calls onAdd() with the
   * result.
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
          handler: form => {
            this.onAdd(form.barcode);
          }
        }
      ]
    });

    alert.present();
  }

  /**
   * Starts barcode scanner and calls onAdd() with barcode if it got a barcode.
   */
  onScanBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.onAdd(barcodeData.text);
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Pushes RentalDetailsPage on nav with items to rent.
   */
  onContinue() {
    const remaining = this.kitItems.some(kitItem => !kitItem.barcode);

    if (!remaining) {
      this.navCtrl.push(RentalDetailsPage, {
        items: this.items
      });
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
            handler: () => {
              this.navCtrl.push(RentalDetailsPage, {
                items: this.items
              });
            }
          }
        ]
      });

      alert.present();
    }
  }

  /**
   * Removes kit item and item from the list of local items.
   */
  onRemoveKitItem(barcode: string) {
    this.removeItem(barcode);

    const kitItemindex = this.kitItems.findIndex(kitItem => kitItem.barcode === barcode);
    this.kitItems[kitItemindex].barcode = '';
  }

  /**
   * Removes item with the barcode from the list of local items.
   */
  onRemoveOtherItem(barcode: string) {
    this.removeItem(barcode);

    const otherItemIndex = this.otherItems.findIndex(item => item.barcode === barcode);
    this.otherItems.splice(otherItemIndex, 1);
  }

  /**
   * Removes item with the barcode from the list of local items.
   */
  private removeItem(barcode: string) {
    const itemIndex = this.items.findIndex(item => item.barcode === barcode);
    this.items.splice(itemIndex, 1);
  }
}
