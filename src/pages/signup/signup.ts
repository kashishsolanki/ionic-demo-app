import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WelcomePage } from '../welcome/welcome';
import { UserListFilterPipe } from '../../pipes/user-filter-pipe';

/**
 * SignupPage for allow user to signup.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  isSubmitClick: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    
  }

  ngOnInit() {
    //set signupForm
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])]
    });
  }

  signup() {
    //handle signup button click event
    this.isSubmitClick = true;

    if(this.signupForm.valid){
      //Allow user to signup if it is not already registered.
      if(localStorage.getItem('users') == undefined) {
        localStorage.setItem('users', JSON.stringify([this.signupForm.value]));
        this.navCtrl.setRoot(WelcomePage);
      }
      else{
        let users = JSON.parse(localStorage.getItem('users'));
        let userListFilterPipe = new UserListFilterPipe();
        let isAlreadyRegisteredUser =  userListFilterPipe.transform(users, this.signupForm.value.username);
        if(isAlreadyRegisteredUser.length > 0){
          const toast = this.toastCtrl.create({
            message: 'Username is already taken',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
        }
        else{
          users.push(this.signupForm.value);
          localStorage.setItem('users', JSON.stringify(users));
          this.navCtrl.setRoot(WelcomePage);
        }
      }
    }
  }

}
