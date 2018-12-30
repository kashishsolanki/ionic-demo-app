import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserListFilterPipe } from '../../pipes/user-filter-pipe';
import { TabsPage } from '../tabs/tabs';

/**
 * LoginPage for allow user to login and can see TabsPage.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  isSubmitClick: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    // set login form
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])]
    })
  }

  login() {
    // handle login click button event
    this.isSubmitClick = true;

    if(this.loginForm.valid) {
      //allow to login and show TabsPage if username and passwored are correct
      let users = JSON.parse(localStorage.getItem('users'));
      let userListFilterPipe = new UserListFilterPipe();
      let isRegisteredUser =  userListFilterPipe.transform(users, this.loginForm.value.username);
      if(isRegisteredUser.length > 0 && (isRegisteredUser[0].password.trim() == this.loginForm.value.password)) {
        localStorage.setItem('isLogin', 'true');
        this.navCtrl.setRoot(TabsPage);
      }
      else{
        //show toast if username or password are incorrect
        const toast = this.toastCtrl.create({
          message: 'Invalid Username and password',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }

    }
  }

}
