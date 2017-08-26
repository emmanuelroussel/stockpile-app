import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ItemProperties } from '../../constants';

import { Actions } from '../../constants';
import { EditFieldPage } from '../edit-field/edit-field';
import { ItemsService } from '../../services/items.service';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-view-field',
  templateUrl: 'view-field.html'
})
export class ViewFieldPage {
  itemProperties = ItemProperties;
  field;
  type;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {}

  /**
   * Gets field.
   */
  ngOnInit() {
    this.field = this.navParams.get('field');
    this.type = this.navParams.get('type');
  }

  /**
   * Pushes page on nav with item to allow user to edit the item.
   */
  onEditField() {
    this.navCtrl.push(EditFieldPage, {
      action: Actions.edit,
      type: this.type,
      field: Object.assign({}, this.field),
    });
  }
}
