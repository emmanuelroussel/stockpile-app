import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { InventoryData } from '../../providers/inventory-data';
import { AddKitItemPage } from '../add-kit-item/add-kit-item';

import { Actions, Messages } from '../../constants';
import { Notifications } from '../../providers/notifications';

@Component({
  selector: 'page-edit-kit',
  templateUrl: 'edit-kit.html'
})
export class EditKitPage {
  actions = Actions;
  action: Actions = '';
  kit: { kitID?: number, name?: string } = {};
  kitItems = [];
  modelsToDelete = [];
  modelsToCreate = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inventoryData: InventoryData,
    public notifications: Notifications,
    public modalCtrl: ModalController,
    public events: Events
  ) { }

  ngOnInit() {
    this.action = this.navParams.get('action');

    if (this.action === Actions.edit) {
      this.kit = this.navParams.get('kit');
      this.kitItems = this.navParams.get('kitItems');
    }

    this.events.subscribe('kit-item:added', kitItem => {
      this.kitItems.push(kitItem);
      this.modelsToCreate.push(kitItem.modelID);
    });
  }

  onSave() {
    let apiCall;
    let message;
    let event;

    if (this.action === Actions.add) {
      apiCall = this.inventoryData.addKit(this.kit.name);
      message = Messages.kitAdded;
      event = 'kit:added';
    } else {
      apiCall = this.inventoryData.editKit(this.kit);
      message = Messages.kitEdited;
      event = 'kit:edited';
    }

    apiCall.subscribe(
      kit => this.saveKitItems(kit, message, event),
      err => this.notifications.showToast(err)
    );
  }

  private saveKitItems(kit, message: string, event: string) {
    let models = [];

    if (this.action === Actions.add) {
      this.kit.kitID = kit.id;

      for (const kitItem of this.kitItems) {
        models.push(this.inventoryData.addKitItem(this.kit.kitID, kitItem.modelID).toPromise());
      }
    } else {
      for (const modelID of this.modelsToDelete) {
        models.push(this.inventoryData.deleteKitItem(this.kit.kitID, modelID).toPromise());
      }

      for (const modelID of this.modelsToCreate) {
        models.push(this.inventoryData.addKitItem(this.kit.kitID, modelID).toPromise());
      }
    }

    Promise.all(models).then(
      success => {
        this.notifications.showToast(message);
        this.events.publish(event, this.kit);
        this.navCtrl.pop();
      },
      err => this.notifications.showToast(err)
    );
  }

  onDelete() {
    this.inventoryData.deleteKit(this.kit.kitID).subscribe(
      success => {
        this.notifications.showToast(Messages.kitDeleted);
        this.events.publish('kit:deleted', this.kit);
        const parentIndex = this.navCtrl.indexOf(this.navCtrl.getPrevious());
        this.navCtrl.remove(parentIndex).then(
          () => this.navCtrl.pop()
        );
      },
      err => this.notifications.showToast(err)
    );
  }

  onAddItem() {
    this.navCtrl.push(AddKitItemPage);
  }

  onRemoveFromList(index, kitItem) {
    this.modelsToDelete.push(kitItem.modelID);
    this.kitItems.splice(index, 1);
  }
}
