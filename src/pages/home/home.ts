import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { RentalPage } from '../rental/rental';
import { Actions } from '../../constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  actions = Actions;
  segment: Actions = this.actions.rent;
  tag: string = '';

  constructor(public navCtrl: NavController) { }

  onNext() {
    if (this.tag) {
      if (this.segment === this.actions.rent || this.segment === this.actions.return) {
        this.navCtrl.push(RentalPage, {
          tag: this.tag,
          action: this.segment
        });
      } else if (this.segment === this.actions.edit || this.segment === this.actions.add) {
        this.navCtrl.push(ItemPage, {
          tag: this.tag,
          action: this.segment
        });
      }

      this.segment = this.actions.rent;
      this.tag = '';
    }
  }
}
