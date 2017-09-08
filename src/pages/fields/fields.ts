import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Actions } from '../../constants';
import { EditFieldPage } from '../edit-field/edit-field';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-fields',
  templateUrl: 'fields.html'
})
export class FieldsPage {
  fields: Observable<any>;
  type: string;
  typePlural: string;

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
    this.navCtrl.push(EditFieldPage, {
      action: Actions.edit,
      type: this.type,
      field: Object.assign({}, field),
    });
  }

  /**
   * Pushes page on nav to allow user to add a new field.
   */
  onAdd() {
    this.navCtrl.push(EditFieldPage, {
      action: Actions.add,
      type: this.type
    });
  }
}
