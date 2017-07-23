import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Actions } from '../../constants';
import { EditKitPage } from '../edit-kit/edit-kit';
import { Kit } from '../../models/kits';
import { KitModel } from '../../models/kit-models';
import { KitsService } from '../../services/kits.service';
import { KitModelsService } from '../../services/kit-models.service';
import { KitModelsActions } from '../../store/kit-models/kit-models.actions';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-view-kit',
  templateUrl: 'view-kit.html'
})
export class ViewKitPage {
  kit: Observable<Kit>;
  kitModels: Observable<Array<KitModel>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public kitsService: KitsService,
    public kitModelsService: KitModelsService,
    public kitModelsActions: KitModelsActions
  ) {}

  /**
   * Gets kit items.
   */
  ngOnInit() {
    const kitID = this.navParams.get('kitID');

    this.kit = this.kitsService.getKit(kitID);
    this.kitModels = this.kitModelsService.getKitModels(kitID);

    this.kitModelsActions.fetchKitModels(kitID);
  }

  /**
   * Pushes page on nav to allows users to edit the kit.
   */
  onEditKit() {
    let kitID;
    this.kit.take(1).subscribe(kit => kitID = kit.kitID);

    this.navCtrl.push(EditKitPage, {
      kitID: kitID,
      action: Actions.edit
    });
  }
}
