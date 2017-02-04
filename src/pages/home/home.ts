import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  segment: string = 'Rent';
  tag: {tag?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController) { }

  onNext(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log('hello');
    }
  }
}
