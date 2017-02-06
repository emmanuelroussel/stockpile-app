import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';

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
          console.log('Edit');
          break;
        }
        case 'Add': {
          this.navCtrl.push(AddItemPage, {
            tag: this.tag
          });
          break;
        }
      }

      this.segment = 'Rent';
      this.tag = '';
    }
  }
}
