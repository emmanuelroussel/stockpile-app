import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models';
import { ExternalRenter } from '../../models/external-renters';
import { Observable } from 'rxjs/Observable';
import { ItemProperties, LoadingMessages } from '../../constants';
import { LayoutActions } from '../../store/layout/layout.actions';
import { ItemFilterPage } from '../item-filter/item-filter';
import { ExternalRentersActions } from '../../store/external-renters/external-renters.actions';
import { dateToMySQLFormat } from '../../utils';

@Component({
  selector: 'page-rental-details',
  templateUrl: 'rental-details.html'
})
export class RentalDetailsPage {
  readonly timezoneOffset: number = (new Date()).getTimezoneOffset() / (60 * 24);
  items: Observable<Items>;
  rentalForm: FormGroup;
  externalRenter: ExternalRenter;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions,
    public layoutActions: LayoutActions,
    public formBuilder: FormBuilder,
    public externalRentersActions: ExternalRentersActions,
  ) {}

  /**
   * Gets items to rent and sets the rental's return date to tomorrow as default.
   */
  ngOnInit() {
    this.items = this.itemsService.getItems();
    this.externalRentersActions.fetchExternalRenters();

    // We need to offset the date by the difference between the user's timezone
    // and UTC 0 to have an accurate date
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - this.timezoneOffset + 1);

    this.rentalForm = this.formBuilder.group({
      end: [
        tomorrow.toISOString(),
        Validators.compose([Validators.required, this.dateInFuture('end')])
      ],
      notes: ['']
    });
  }

  /**
   * Rents items by calling the api for each item in the list of items to rent.
   * Pops the nav back to the root (TabsPage) when done.
   */
  onRent() {
    if (this.rentalForm.valid) {
      let externalRenterID = null;
      if (this.externalRenter) {
        externalRenterID = this.externalRenter.externalRenterID;
      }

      // Set end date to UTC time
      let end = new Date(this.rentalForm.value.end);
      end.setDate(end.getDate() + this.timezoneOffset);

      const details = {
        ...this.rentalForm.value,
        externalRenterID,
        start: dateToMySQLFormat(new Date()), // now
        end: dateToMySQLFormat(end)
      };

      this.layoutActions.showLoadingMessage(LoadingMessages.rentingItems);
      this.itemsActions.rentItems(details);
    }
  }

  /**
   * Validates whether a date is greater than today (in the future) or not.
   */
  dateInFuture(to: string) {
    return (control: FormControl): {[key: string]: any} => {
      // Only get the day, month and year to compare (not time) to allow
      // rentals that have to be returned the same day
      const startDate = (new Date()).toISOString().substring(0, 10);
      const endDate = control.value.substring(0, 10);

      return startDate > endDate ? { invalid: endDate } : null;
    };
  }

  /**
   * Presents modal to allow users to choose an external renter.
   */
  onSelectExternalRenter() {
    let modal = this.modalCtrl.create(ItemFilterPage, {
      type: ItemProperties.externalRenter
    });

    modal.onDidDismiss(element => {
      // If user cancelled, element will be undefined
      if (element) {
        this.externalRenter = element;
      }
   });

   modal.present();
  }

  get end() { return this.rentalForm.get('end'); }
}
