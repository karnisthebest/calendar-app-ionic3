import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ViewController, normalizeURL, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

/**
 * Generated class for the MyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-detail',
  templateUrl: 'my-detail.html',
})
export class MyDetailPage {
  validations_form: FormGroup;
 
  item: any;
  loading: any;

  dateArray: any;
  
  newObj: any = [
    {date:"2018-01-02", checked: false},
    {date:"2018-01-02", checked: false},
    {date:"2018-01-02", checked: false},

  ];

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,

    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.getData()
    // this.mapThis()
  }

  // mapThis(){
  //   this.newObj = this.dateArray.map(x => {
      
  //   console.log(x);
  //   // this.newObj  = {
  //   //  date:""
  //   //  checked:""
  //   // })

  // }


  

  getData(){
    this.item = this.navParams.get('data');
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
      location: new FormControl(this.item.location, Validators.required), //here
    });
    this.dateArray = this.item.date;
    console.log(this.dateArray);
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      title: value.title,
      description: value.description,
      location: value.location
    }
    this.firebaseService.updateTask(this.item.id,data)
    .then(
      res => {
        this.viewCtrl.dismiss();
      }
    )
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to delete ' + this.item.title + '?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.firebaseService.deleteTask(this.item.id)
            .then(
              res => this.viewCtrl.dismiss(),
              err => console.log(err)
            )
          }
        }
      ]
    });
    confirm.present();
  }

  openVotes(){
    
  }

  // openImagePicker(){
  //   this.imagePicker.hasReadPermission()
  //   .then((result) => {
  //     if(result == false){
  //       // no callbacks required as this opens a popup which returns async
  //       this.imagePicker.requestReadPermission();
  //     }
  //     else if(result == true){
  //       this.imagePicker.getPictures({
  //         maximumImagesCount: 1
  //       }).then(
  //         (results) => {
  //           for (var i = 0; i < results.length; i++) {
  //             this.uploadImageToFirebase(results[i]);
  //           }
  //         }, (err) => console.log(err)
  //       );
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  // uploadImageToFirebase(image){
  //   this.loading.present();
  //   image = normalizeURL(image);
  //   let randomId = Math.random().toString(36).substr(2, 5);
  //   console.log(randomId);

  //   //uploads img to firebase storage
  //   this.firebaseService.uploadImage(image, randomId)
  //   .then(photoURL => {
  //     this.image = photoURL;
  //     this.loading.dismiss();
  //     let toast = this.toastCtrl.create({
  //       message: 'Image was updated successfully',
  //       duration: 3000
  //     });
  //     toast.present();
  //   })
  // }

}
