import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * DirectivePage to show custom directive example
 */

@Component({
  selector: 'page-directive',
  templateUrl: 'directive.html',
})
export class DirectivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
