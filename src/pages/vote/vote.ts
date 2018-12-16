import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { ConditionalExpr } from '@angular/compiler';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

/**
 * Generated class for the VotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})
export class VotePage {
  validations_form: FormGroup;
 
  item: any;
  loading: any;

  dateArray: any;
  
  newObj: any = [
    {date:"2018-01-02", checked: false},
    {date:"2018-01-02", checked: false},
    {date:"2018-01-02", checked: false},

  ];
  

  constructor(private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,

    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
    
  }

  getData(){
    this.item = this.navParams.get('data');
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
      location: new FormControl(this.item.location, Validators.required), //here
    });
    this.dateArray = this.item.date;
    
    console.log(this.dateArray);
    console.log(this.validations_form);
    
  }
  
}
