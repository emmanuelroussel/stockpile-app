import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Actions } from '../../constants';
import { EditExternalRenterPage } from '../edit-external-renter/edit-external-renter';
import { ExternalRenters } from '../../models/external-renters';
import { ExternalRentersService } from '../../services/external-renters.service';
import { ExternalRentersActions } from '../../store/external-renters/external-renters.actions';

import { MapToIterablePipe, SortPipe } from '../../pipes';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-external-renters',
  templateUrl: 'external-renters.html'
})
export class ExternalRentersPage {
  externalRenters: Observable<ExternalRenters>;

  constructor(
    public navCtrl: NavController,
    public externalRentersService: ExternalRentersService,
    public externalRentersActions: ExternalRentersActions
  ) {}

  /**
   * Gets external renters.
   */
  ngOnInit() {
    this.externalRenters = this.externalRentersService.getExternalRenters();
    this.externalRentersActions.fetchExternalRenters();
  }

  /**
   * Pushes page on nav to allow user to view the external field.
   */
  onViewExternalRenter(externalRenterID: number) {
    this.navCtrl.push(EditExternalRenterPage, { action: Actions.edit, externalRenterID });
  }

  /**
   * Pushes page on nav to allow user to add a new external field.
   */
  onAdd() {
    this.navCtrl.push(EditExternalRenterPage, { action: Actions.add });
  }
}
