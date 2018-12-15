import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';
/**
 * Generated class for the MyLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-login',
  templateUrl: 'my-login.html',
})
export class MyLoginPage {
  email:string;
  password:string;

  //================================
  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Please enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };

  //================================


  constructor( 
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
  }
  goLogin(){
    console.log("Username : "+ this.email);
    console.log("Password : "+ this.password);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //======================================================
  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.push("MyMenuPage");
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goRegister(){
    this.navCtrl.push("MyRegisterPage");
  }

}
