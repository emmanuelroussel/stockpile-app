import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-item-filter',
  templateUrl: 'item-filter.html'
})
export class ItemFilterPage {
  allElements;
  filteredElements;
  type;
  showNew: boolean = false;
  queryText: string = '';

  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    this.allElements = this.navParams.get('elements');
    this.type = this.navParams.get('type');
    this.filteredElements = this.allElements;
  }

  getElements() {
    this.filteredElements = this.allElements;
    this.showNew = false;

    if (this.queryText && this.queryText.trim() !== '') {
      this.filteredElements = this.filteredElements.filter((element) => {
        return (element.name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1);
      });

      const match = this.filteredElements.find((element) => {
        return element.name.toLowerCase() === this.queryText.toLowerCase();
      });

      if (!match) {
        this.showNew = true;
      }
    }
  }

  dismiss(element?: Object, isNew: boolean = false) {
    this.viewCtrl.dismiss(element, isNew);
  }
}
