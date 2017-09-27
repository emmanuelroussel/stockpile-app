import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models/items';
import { Observable } from 'rxjs/Observable';
import { LoadingMessages } from '../../constants';
import { LayoutActions } from '../../store/layout/layout.actions';

import { MapToIterablePipe } from '../../pipes';

@Component({
  selector: 'page-rental-details',
  templateUrl: 'rental-details.html'
})
export class RentalDetailsPage {
  items: Observable<Items>;
  rentalForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions,
    public layoutActions: LayoutActions,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Gets items to rent and sets the rental's return date to tomorrow as default.
   */
  ngOnInit() {
    this.items = this.itemsService.getItems();

    // We need to offset the date by the difference between the user's timezone
    // and UTC 0 to have an accurate date
    let tomorrow = new Date();
    const offset = tomorrow.getTimezoneOffset() / (60 * 24);
    tomorrow.setDate((new Date()).getDate() - offset + 1);

    this.rentalForm = this.formBuilder.group({
      endDate: [
        tomorrow.toISOString(),
        Validators.compose([Validators.required, this.dateInFuture('endDate')])
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
      // We need to offset the date by the difference between the user's timezone
      // and UTC 0 to have an accurate date
      let today = new Date();
      const offset = today.getTimezoneOffset() / (60 * 24);
      today.setDate((new Date()).getDate() - offset);

      // Transform dates from ISO 8601 to MySQL date format
      const details = {
        ...this.rentalForm.value,
        startDate: today.toISOString().substring(0, 10), // today
        endDate: this.rentalForm.value.endDate.substring(0, 10)
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

  get endDate() { return this.rentalForm.get('endDate'); }
}
