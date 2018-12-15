import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { CalendarModalOptions, CalendarModal } from 'ion2-calendar';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseService } from '../services/firebase.service';




/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  dates: Date[];
  dateArray: any;
  public txtTitle: string;
  public txtLocation: string;
  public txtDescription: string;

  validations_form: FormGroup;
  loading: any;
 

  // =====================


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
    ) {
      this.loading = this.loadingCtrl.create();
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'multi',
      title: 'MULTI',
      defaultDates: this.dates,
      closeLabel: 'Cancel',
    
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present(); // error

    myCalendar.onDidDismiss((dates, type) => {
     
      if (type === 'done') {
        this.dates = [...dates.map(e => e.dateObj)]
      }
    })
  }

  planDone(){
    
  }

  // ============================================

  ionViewWillLoad(){
    this.resetFields()
  }


  resetFields(){
    
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
      
      
    });
  }

  dismissNow() {
    this.viewCtrl.dismiss();
   }


  onSubmit(value){
    let data = {
      title: value.title,
      description: value.description,
      location: value.location,
     
      // image: this.image
    }
    console.log(data,"creates dataz")
    // input data to firevase C R U D => Create
    this.firebaseService.createTask(data)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss();
      }
    )
    }
  
}
