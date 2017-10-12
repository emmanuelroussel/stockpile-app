import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Actions } from '../../constants';
import { CustomFieldPage } from '../custom-field/custom-field';
import { CustomFields } from '../../models/custom-fields';
import { CustomFieldsService } from '../../services/custom-fields.service';
import { CustomFieldsActions } from '../../store/custom-fields/custom-fields.actions';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-custom-fields',
  templateUrl: 'custom-fields.html'
})
export class CustomFieldsPage {
  customFields: Observable<CustomFields>;

  constructor(
    public navCtrl: NavController,
    public customFieldsService: CustomFieldsService,
    public customFieldsActions: CustomFieldsActions
  ) {}

  /**
   * Gets custom fields.
   */
  ngOnInit() {
    this.customFieldsActions.fetchCustomFields();
    this.customFields = this.customFieldsService.getCustomFields();
  }

  /**
   * Pushes page on nav with the custom field to allow user to view it.
   */
  onViewCustomField(customFieldID: number) {
    this.navCtrl.push(CustomFieldPage, { action: Actions.edit, customFieldID });
  }

  /**
   * Pushes page on nav to allow user to add a new kit.
   */
  onAdd() {
    this.navCtrl.push(CustomFieldPage, { action: Actions.add });
  }
}
