import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Actions } from '../../constants';
import { EditItemPage } from '../edit-item/edit-item';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/items';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html'
})
export class ViewItemPage {
  item: Observable<Item>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public itemsService: ItemsService
  ) {}

  /**
   * Gets item.
   */
  ngOnInit() {
    const barcode = this.navParams.get('barcode');
    this.item = this.itemsService.getItem(barcode);
  }

  /**
   * Pushes page on nav with item to allow user to edit the item.
   */
  onEditItem() {
    let barcode;
    this.item.take(1).subscribe(item => barcode = item.barcode);

    this.navCtrl.push(EditItemPage, {
      barcode: barcode,
      action: Actions.edit
    });
  }
}
