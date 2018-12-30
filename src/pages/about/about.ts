import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public app: App) {
  }

  ionViewDidLoad() {
  }

  logout(){
    localStorage.removeItem('isLogin');
    this.app.getRootNav().setRoot(WelcomePage);
  }

}
