import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models/items';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-rental-details',
  templateUrl: 'rental-details.html'
})
export class RentalDetailsPage {
  items: Observable<Items>;
  details: { endDate?: string, notes?: string } = {};

  constructor(
    public navCtrl: NavController,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions
  ) {}

  /**
   * Gets items to rent and sets the rental's return date to tomorrow as default.
   */
  ngOnInit() {
    this.items = this.itemsService.getItems();

    let tomorrow = new Date();
    tomorrow.setDate((new Date()).getDate() + 1);
    this.details.endDate = tomorrow.toISOString();
  }

  /**
   * Rents items by calling the api for each item in the list of items to rent.
   * Pops the nav back to the root (TabsPage) when done.
   */
  onRent(form: NgForm) {
    // Transform dates from ISO 8601 to MySQL date format
    const details = {
      ...form.value,
      startDate: (new Date()).toISOString().substring(0, 10), // today
      endDate: form.value.endDate.substring(0, 10)
    };

    this.itemsActions.rentItems(details);
  }
}
