import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';
/**
 * Generated class for the MyRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-register',
  templateUrl: 'my-register.html',
})
export class MyRegisterPage {

  email:string;
  password:string;
  // rePassword:string;

  // =================================

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  rePasswordError: string ='';

  // =================================

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'rePassword': [
      { type: 'required', message: 'Re-Password is required.' },
      { type: 'minlength', message: 'Re-Password must be at least 5 characters long.' }
    ]
  };
  

  constructor( private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
  }

  // Register(){
  //   if(this.email.length==0 || this.password.length==0 || this.repassword.length==0 ){
  //     alert("Please Fill All Fields");
  //   }
  //   else if (this.email.length<8){
  //     alert("Please enter at least 8 characters on Username");
  //   }
  //   else if (this.password.length<8){
  //     alert("Please enter at least 8 characters on Password");
  //   }
  //   else if(this.email == this.password){
  //     alert("You can not use SAME Username and Password");
  //   }
  //   else if(this.password!= this.rePassword){
  //     alert("Password ans Re-password are DIFFERENT!");
  //   }
  //   else{
  //     alert("Register is DONE!!")
  //     console.log("Register-Username : " + this.email);
  //     console.log("Register-Password : " + this.password);
      
  //   }
  // }

  // =========================

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
      rePassword: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
    
    
  }

  tryRegister(value) {
    if (value.password != value.rePassword) {
      this.rePasswordError = "Password and Re-password are DIFFERENT!";
    }
     else {
      console.log(value.rePassword, "re-password")
      console.log(value, "register info from form")
      this.authService.doRegister(value)
        .then(res => {
          console.log(res);
          this.errorMessage = "";
          this.successMessage = "Your account has been created. Please log in.";
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = "";
        })
    } // end else 

  }

  goLoginPage(){
    this.navCtrl.pop();
  }

}
