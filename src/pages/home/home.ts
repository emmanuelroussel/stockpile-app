import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
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
      switch (this.segment) {
        case this.actions.rent: {
          console.log(this.actions.rent);
          break;
        }
        case this.actions.return: {
          console.log(this.actions.return);
          break;
        }
        case this.actions.edit: {
          this.navCtrl.push(ItemPage, {
            tag: this.tag,
            action: this.actions.edit
          });
          break;
        }
        case this.actions.add: {
          this.navCtrl.push(ItemPage, {
            tag: this.tag,
            action: this.actions.add
          });
          break;
        }
      }

      this.segment = this.actions.rent;
      this.tag = '';
    }
  }
}
