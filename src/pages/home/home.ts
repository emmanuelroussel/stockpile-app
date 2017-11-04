import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Actions, LoadingMessages } from '../../constants';
import { Notifications } from '../../providers/notifications';
import { ItemData } from '../../providers/item-data';
import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { KitsService } from '../../services/kits.service';
import { KitsActions } from '../../store/kits/kits.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { Kits } from '../../models';
import { KitPage } from '../kit/kit';
import { KitRentalPage } from '../kit-rental/kit-rental';
import { Observable } from 'rxjs/Observable';
import { sort } from '../../utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  kits: Observable<Kits>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public notifications: Notifications,
    public itemData: ItemData,
    public barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public kitsService: KitsService,
    public kitsActions: KitsActions,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions,
    public layoutActions: LayoutActions
  ) {}

  /**
   * Gets kits.
   */
  ngOnInit() {
    this.kits = this.kitsService.getKits();
    this.kitsActions.fetchKits();
  }

  /**
   * Decides whether the item should be rented or returned based on whether it is
   * available or not and pushes RentalPage with the corresponding action.
   */
  pushPage(barcode: string) {
    this.layoutActions.showLoadingMessage(LoadingMessages.startingRental);
    this.itemsActions.startRental(barcode);
  }

  /**
   * Starts barcode scanner and process barcode if it is present (i.e. user didn't cancel)
   */
  onScanBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.pushPage(barcodeData.text);
        }
      },
      err => this.notifications.showMessage(err)
    );
  }

  /**
   * Creates alert for user to enter a barcode and process barcode.
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
          handler: form => this.pushPage(form.barcode)
        }
      ]
    });

    alert.present();
  }

  /**
   * Shows alert to allow user to choose a kit and pushes kit rental page with
   * chosen kit.
   */
  onRentKit() {
    let currentKits;
    let options;

    this.kits.take(1).subscribe(k => {
      currentKits = Object.keys(k.results).map((key) => k.results[key]);
    });

    currentKits.sort(sort);

    if (currentKits.length) {
      let inputs = [];

      currentKits.map(kit => {
        return inputs.push({ label: kit.name, value: kit.kitID, type: 'radio'});
      });

      options = {
        title: 'Choose Kit',
        inputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: kitID => {
              this.itemsActions.resetRentals();
              this.navCtrl.push(KitRentalPage, { kitID });
            }
          }
        ]
      };
    } else {
      options = {
        title: 'Kit',
        message: 'You haven\'t created any kits yet.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Create a kit',
            handler: () => this.navCtrl.push(KitPage, { action: Actions.add })
          }
        ]
      };
    }

    let alert = this.alertCtrl.create(options);
    alert.present();
  }
}
