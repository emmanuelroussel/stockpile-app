import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

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

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) { }

  /**
   * This page is used to let the user choose a brand, model or category.
   * This methos gets the type and the brands, models or categories.
   */
  ngOnInit() {
    this.allElements = this.navParams.get('elements');
    this.type = this.navParams.get('type');
    this.filteredElements = this.allElements;
  }

  /**
   * Gets the brands, models or categories that match the text in the search
   * field.
   */
  onGetElements() {
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

  /**
   * Closes the modal and passes the info.
   */
  onDismiss(element?: Object, isNew: boolean = false) {
    this.viewCtrl.dismiss(element, isNew);
  }

  /**
   * Creates alert to allow user to create a new brand, model or category.
   */
  onCreate() {
    let alert = this.alertCtrl.create({
      title: `Create new ${this.type.toLowerCase()}`,
      inputs: [
        {
          name: 'elementName',
          placeholder: `${this.type} name`
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: form => {
            this.onDismiss(form.elementName, true);
          }
        }
      ]
    });

    alert.present();
  }
}
