import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  segment: string = 'Rent';
  value: {tag?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController) { }

  onNext(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      switch(this.segment) {
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
            tag: this.value.tag
          });
          break;
        }
      }
    }
  }
}
