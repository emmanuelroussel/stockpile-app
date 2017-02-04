import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {

  tag: string = '';
  item: {brand?: string, model?: string, category?: string, cost?: string, condition?: string} = {};
  conditions: Array<string> = ['Good', 'Broken', 'Getting Fixed'];
  categories: Array<string> = ['Camera', 'Stand', 'Cable'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tag = this.navParams.get('tag');
    this.item.condition = 'Good';
  }

  onSave(form: NgForm) {

  }
}
