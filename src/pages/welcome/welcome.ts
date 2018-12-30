import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

/**
 * WelcomePage for new user which is not login in application.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  signup() {
    //navigate to signup page
    this.navCtrl.push(SignupPage);
  }

  login() {
    //navigate to login page
    this.navCtrl.push(LoginPage);
  }

}
