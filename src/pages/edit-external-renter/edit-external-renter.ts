import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ExternalRenter } from '../../models/external-renters';
import { ExternalRentersService } from '../../services/external-renters.service';
import { ExternalRentersActions } from '../../store/external-renters/external-renters.actions';
import { LayoutActions } from '../../store/layout/layout.actions';

import { Actions, LoadingMessages } from '../../constants';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-edit-external-renter',
  templateUrl: 'edit-external-renter.html'
})
export class EditExternalRenterPage {
  externalRenterForm: FormGroup;
  blur = {
    name: false,
    email: false,
    phone: false
  };
  actions = Actions;
  action: Actions = '';
  externalRenter: Observable<ExternalRenter>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public externalRentersService: ExternalRentersService,
    public externalRentersActions: ExternalRentersActions,
    public layoutActions: LayoutActions,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Gets the action (add or edit) and if action is edit, also gets the external
   * renter.
   */
  ngOnInit() {
    this.action = this.navParams.get('action');

    this.externalRenterForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      phone: ['']
    });

    if (this.action === Actions.edit) {
      const externalRenterID = this.navParams.get('externalRenterID');
      this.externalRenter = this.externalRentersService.getExternalRenter(externalRenterID);
    }
  }

  /**
   * Creates or updates the external renter.
   */
  onSave() {
    this.blur.name = true;
    this.blur.email = true;
    this.blur.phone = true;

    if (this.externalRenterForm.valid) {
      if (this.action === Actions.add) {
        this.layoutActions.showLoadingMessage(LoadingMessages.creatingExternalRenter);
        this.externalRentersActions.createExternalRenter(this.externalRenterForm.value, true);
      } else {
        let externalRenterID;
        this.externalRenter.take(1).subscribe(externalRenter => externalRenterID = externalRenter.externalRenterID);

        this.layoutActions.showLoadingMessage(LoadingMessages.updatingExternalRenter);
        this.externalRentersActions.updateExternalRenter({ ...this.externalRenterForm.value, externalRenterID });
      }
    }
  }

  /**
   * Confirms if user wants to delete the external renter.
   */
  onDelete() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to delete this external renter?',
      message: 'It will be deleted permanently',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.deleteExternalRenter()
        }
      ]
    });
    alert.present();
  }

  /**
   * Deletes external renter.
   */
  deleteExternalRenter() {
    let externalRenterID;
    this.externalRenter.take(1).subscribe(externalRenter => externalRenterID = externalRenter.externalRenterID);

    this.layoutActions.showLoadingMessage(LoadingMessages.deletingExternalRenter);
    this.externalRentersActions.deleteExternalRenter(externalRenterID);
  }

  get name() { return this.externalRenterForm.get('name'); }
  get email() { return this.externalRenterForm.get('email'); }
  get phone() { return this.externalRenterForm.get('phone'); }
}
