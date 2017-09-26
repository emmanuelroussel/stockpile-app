import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Actions } from '../../constants';
import { EditKitPage } from '../edit-kit/edit-kit';
import { Kits } from '../../models/kits';
import { KitsService } from '../../services/kits.service';

import { MapToIterablePipe, SortPipe } from '../../pipes';

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
    this.navCtrl.push(EditKitPage, { action: Actions.edit, kitID });
  }

  /**
   * Pushes page on nav to allow user to add a new kit.
   */
  onAdd() {
    this.navCtrl.push(EditKitPage, { action: Actions.add });
  }
}
