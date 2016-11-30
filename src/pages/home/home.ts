import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      alert('We got a barcode\n' +
                'Result: ' + barcodeData.text + '\n' +
                'Format: ' + barcodeData.format + '\n' +
                'Cancelled: ' + barcodeData.cancelled);
    }, (err) => {
      alert('scan failed: ' + err);
    });
  }

}
