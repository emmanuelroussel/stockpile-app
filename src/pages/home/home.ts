import { Component } from '@angular/core';
import { NavController, AlertController, Platform, Events } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalPage } from '../rental/rental';
import { Actions } from '../../constants';
import { Notifications } from '../../providers/notifications';
import { ItemData } from '../../providers/item-data';
import { KitData } from '../../providers/kit-data';
import { EditKitPage } from '../edit-kit/edit-kit';
import { KitRentalPage } from '../kit-rental/kit-rental';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  kits;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public notifications: Notifications,
    public itemData: ItemData,
    public barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public kitData: KitData,
    public events: Events
  ) { }

  /**
   * Gets kits from the api and listens to events in case kits changed.
   */
  ngOnInit() {
    this.kitData.getKits().subscribe(
      kits => this.kits = kits.results,
      err => this.notifications.showToast(err)
    );

    this.events.subscribe('kit:edited', kit => {
      const index = this.kits.findIndex(element => element.kitID === kit.kitID);
      this.kits.splice(index, 1, kit);
    });

    this.events.subscribe('kit:added', kit => {
      this.kits.push(kit);
    });

    this.events.subscribe('kit:deleted', kit => {
      const index = this.kits.findIndex(element => element.kitID === kit.kitID);
      this.kits.splice(index, 1);
    });
  }

  /**
   * Decide whether the item should be rented or returned based on whether it is
   * available or not and push RentalPage with the corresponding action.
   */
  pushPage(barcode: string) {
    this.itemData.getItem(barcode).subscribe(
      (item: any) => {
        let action;

        // 0 = false, item is currently rented
        // 1 = true, item is available
        if (item.available === 0) {
          action = Actions.return;
        } else {
          action = Actions.rent;
        }

        this.navCtrl.push(RentalPage, {
          item,
          action
        });
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Starts barcode scanner and calls pushPage() with the barcode if it got a
   * barcode.
   */
  onScanBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.pushPage(barcodeData.text);
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Creates alert for user to enter a barcode and calls pushPage() with the
   * barcode when user taps 'Next'.
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
            this.pushPage(form.barcode);
          }
        }
      ]
    });

    alert.present();
  }

  /**
   * Shows alert to allow user to choose a kit and pushes kit rental page.
   */
  onRentKit() {
    let alert;

    if (this.kits.length) {
      let inputs = [];

      for (const kit of this.kits) {
        inputs.push({ label: kit.name, value: kit.kitID, type: 'radio'});
      }

      alert = this.alertCtrl.create({
        title: 'Kit',
        inputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: kitID => {
              this.navCtrl.push(KitRentalPage, {
                kitID
              });
            }
          }
        ]
      });
    } else {
      alert = this.alertCtrl.create({
        title: 'Kit',
        message: 'You haven\'t created any kits yet.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Create a kit',
            handler: () => {
              this.navCtrl.push(EditKitPage, {
                action: Actions.add
              });
            }
          }
        ]
      });
    }

    alert.present();
  }
}
