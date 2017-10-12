import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, ModalController, Events, AlertController } from 'ionic-angular';

import { AddKitModelPage } from '../add-kit-model/add-kit-model';
import { Kit, KitModel } from '../../models';
import { KitsService } from '../../services/kits.service';
import { KitsActions } from '../../store/kits/kits.actions';
import { KitModelsService } from '../../services/kit-models.service';
import { KitModelsActions } from '../../store/kit-models/kit-models.actions';
import { LayoutActions } from '../../store/layout/layout.actions';

import { Actions, LoadingMessages } from '../../constants';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-kit',
  templateUrl: 'kit.html'
})
export class KitPage {
  kitForm: FormGroup;
  blur = { name: false };
  actions = Actions;
  action: Actions = '';
  kit: Observable<Kit>;
  kitModels: Observable<Array<KitModel>>;
  showLoadingSpinner: Observable<boolean>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public events: Events,
    public kitsService: KitsService,
    public kitModelsService: KitModelsService,
    public kitModelsActions: KitModelsActions,
    public kitsActions: KitsActions,
    public layoutActions: LayoutActions,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Gets the action (add or edit) and if action is edit, also gets the kit and
   * kitModels.
   */
  ngOnInit() {
    this.action = this.navParams.get('action');
    this.kitModels = this.kitModelsService.getTempKitModels();
    this.kitModelsActions.resetTempKitModels();
    this.showLoadingSpinner = this.kitModelsService.getShouldShowLoadingSpinner();

    this.kitForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    if (this.action === Actions.edit) {
      const kitID = this.navParams.get('kitID');
      this.kitModelsActions.fetchKitModels(kitID);
      this.kit = this.kitsService.getKit(kitID);
    }
  }

  /**
   * Creates or updates the kit, and creates and deletes kit models.
   */
  onSave() {
    this.blur.name = true;

    if (this.kitForm.valid) {
      let kitModels;
      this.kitModels.take(1).subscribe(tempKitModels => kitModels = tempKitModels);

      if (!kitModels.length) {
        let alert = this.alertCtrl.create({
          title: 'No items in kit',
          message: 'Please add at least one item to the kit',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Add Item',
              handler: () => this.onAddItem(Actions.add)
            }
          ]
        });

        alert.present();
      } else {
        if (this.action === Actions.add) {
          this.layoutActions.showLoadingMessage(LoadingMessages.creatingKit);
          this.kitsActions.createKit(this.kitForm.value);
        } else {
          let kitID;
          this.kit.take(1).subscribe(kit => kitID = kit.kitID);

          this.layoutActions.showLoadingMessage(LoadingMessages.updatingKit);
          this.kitsActions.updateKit({ name: this.kitForm.value.name, kitID });
        }
      }
    }
  }

  /**
   * Confirms if user wants to delete the kit.
   */
  onDelete() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to delete this kit?',
      message: 'It will be deleted permanently',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.deleteKit()
        }
      ]
    });
    alert.present();
  }

  /**
   * Deletes kit.
   */
  deleteKit() {
    let kitID;
    this.kit.take(1).subscribe(kit => kitID = kit.kitID);

    this.layoutActions.showLoadingMessage(LoadingMessages.deletingKit);
    this.kitsActions.deleteKit(kitID);
  }

  /**
   * Pushes page on nav to allow user to choose a brand, model, and quantity.
   */
  onAddItem(action: Actions, kitModel: any = {}) {
    this.navCtrl.push(AddKitModelPage, {
      action,
      kitModel: Object.assign({}, kitModel)
    });
  }

  /**
   * Removes the kitModel from the list.
   */
  onRemoveFromList(modelID: number) {
    this.kitModelsActions.deleteTemp(modelID);
  }

  get name() { return this.kitForm.get('name'); }
}
