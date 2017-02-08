import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  segment: string = 'Rent';
  tag: string = '';

  constructor(public navCtrl: NavController) { }

  onNext() {
    if (this.tag) {
      switch (this.segment) {
        case 'Rent': {
          console.log('Rent');
          break;
        }
        case 'Return': {
          console.log('Return');
          break;
        }
        case 'Edit': {
          this.navCtrl.push(ItemPage, {
            tag: this.tag,
            action: 'Edit'
          });
          break;
        }
        case 'Add': {
          this.navCtrl.push(ItemPage, {
            tag: this.tag,
            action: 'Add'
          });
          break;
        }
      }

      this.segment = 'Rent';
      this.tag = '';
    }
  }
}
