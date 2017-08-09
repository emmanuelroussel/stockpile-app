import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { AddKitItemPage } from '../add-kit-item/add-kit-item';
import { Kit } from '../../models/kits';
import { KitsService } from '../../services/kits.service';
import { KitsActions } from '../../store/kits/kits.actions';
import { KitModelsService } from '../../services/kit-models.service';
import { KitModelsActions } from '../../store/kit-models/kit-models.actions';
import { LayoutActions } from '../../store/layout/layout.actions';

import { Actions, LoadingMessages } from '../../constants';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-edit-kit',
  templateUrl: 'edit-kit.html'
})
export class EditKitPage {
  actions = Actions;
  action: Actions = '';
  kit: Observable<Kit>;
  kitModels = [];
  modelsToDelete = [];
  modelsToCreate = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events,
    public kitsService: KitsService,
    public kitModelsService: KitModelsService,
    public kitModelsActions: KitModelsActions,
    public kitsActions: KitsActions,
    public layoutActions: LayoutActions
  ) {}

  /**
   * Gets the action (add or edit) and if action is edit, also gets the kit and
   * kitModels.
   */
  ngOnInit() {
    this.action = this.navParams.get('action');

    if (this.action === Actions.edit) {
      const kitID = this.navParams.get('kitID');
      this.kit = this.kitsService.getKit(kitID);

      // Creating a local copy instead of using observables because of the
      // complexity of managing kit models before the user saves the kit.
      let kitModels;
      this.kitModelsService.getKitModels(kitID).take(1).subscribe(k => kitModels = (k || []).slice());

      this.kitModels = kitModels;
    }

    // Listens to the event published when user adds a kit model and add it to
    // local array of kit models.
    this.events.subscribe('kit-item:added', kitModel => {
      this.kitModels.push(kitModel);
      this.modelsToCreate.push(kitModel.modelID);
    });
  }

  /**
   * Creates or updates the kit, and creates and deletes kit models.
   */
  onSave(form: NgForm) {
    if (this.action === Actions.add) {
      this.layoutActions.showLoadingMessage(LoadingMessages.creatingKit);
      this.kitsActions.createKit(form.value, this.modelsToCreate);
    } else {
      let kitID;
      this.kit.take(1).subscribe(kit => kitID = kit.kitID);

      this.layoutActions.showLoadingMessage(LoadingMessages.updatingKit);
      this.kitsActions.updateKit({ name: form.value.name, kitID: kitID }, this.modelsToCreate, this.modelsToDelete);
    }
  }

  /**
   * Deletes kit.
   */
  onDelete() {
    let kitID;
    this.kit.take(1).subscribe(kit => kitID = kit.kitID);

    this.layoutActions.showLoadingMessage(LoadingMessages.deletingKit);
    this.kitsActions.deleteKit(kitID);
  }

  /**
   * Pushes page on nav to allow user to choose a brand and model.
   */
  onAddItem() {
    this.navCtrl.push(AddKitItemPage);
  }

  /**
   * Removes the kitItem from the list and mark it to be deleted.
   */
  onRemoveFromList(index, kitModel) {
    this.modelsToDelete.push(kitModel.modelID);
    this.kitModels.splice(index, 1);
  }
}
