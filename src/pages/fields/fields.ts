import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Actions, ItemProperties } from '../../constants';
import { FieldPage } from '../field/field';

import { MapToIterablePipe, SortPipe } from '../../pipes';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-fields',
  templateUrl: 'fields.html'
})
export class FieldsPage {
  fields: Observable<any>;
  type: string;
  typePlural: string;
  itemProperties = ItemProperties;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  /**
   * Gets fields and type.
   */
  ngOnInit() {
    this.fields = this.navParams.get('fields');
    this.type = this.navParams.get('type');
    this.typePlural = this.navParams.get('typePlural');
  }

  /**
   * Pushes page on nav with the field to allow user to view it.
   */
  onViewField(field: any) {
    this.navCtrl.push(FieldPage, {
      action: Actions.edit,
      type: this.type,
      field: Object.assign({}, field),
    });
  }

  /**
   * Pushes page on nav to allow user to add a new field.
   */
  onAdd() {
    this.navCtrl.push(FieldPage, {
      action: Actions.add,
      type: this.type
    });
  }
}
