import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Actions } from '../../constants';
import { ExternalRenterPage } from '../external-renter/external-renter';
import { ExternalRenters } from '../../models';
import { ExternalRentersService } from '../../services/external-renters.service';
import { ExternalRentersActions } from '../../store/external-renters/external-renters.actions';

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
   * Pushes page on nav to allow user to view the external renter.
   */
  onViewExternalRenter(externalRenterID: number) {
    this.navCtrl.push(ExternalRenterPage, { action: Actions.edit, externalRenterID });
  }

  /**
   * Pushes page on nav to allow user to add a new external renter.
   */
  onAdd() {
    this.navCtrl.push(ExternalRenterPage, { action: Actions.add });
  }
}
