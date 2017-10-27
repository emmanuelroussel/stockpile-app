import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Actions } from '../../constants';
import { KitPage } from '../kit/kit';
import { Kits } from '../../models';
import { KitsService } from '../../services/kits.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-kits',
  templateUrl: 'kits.html'
})
export class KitsPage {
  kits: Observable<Kits>;

  constructor(
    public navCtrl: NavController,
    public kitsService: KitsService
  ) {}

  /**
   * Gets kits.
   */
  ngOnInit() {
    this.kits = this.kitsService.getKits();
  }

  /**
   * Pushes page on nav with the kit to allow user to view it.
   */
  onViewKit(kitID: number) {
    this.navCtrl.push(KitPage, { action: Actions.edit, kitID });
  }

  /**
   * Pushes page on nav to allow user to add a new kit.
   */
  onAdd() {
    this.navCtrl.push(KitPage, { action: Actions.add });
  }
}
