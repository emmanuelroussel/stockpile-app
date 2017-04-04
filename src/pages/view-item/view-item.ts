import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Actions } from '../../constants';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html'
})
export class ViewItemPage {
  item;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
  }

  editItem() {
    this.navCtrl.push(ItemPage, {
      item: this.item,
      action: Actions.edit
    });
  }
}
