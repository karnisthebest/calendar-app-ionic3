import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ViewController, normalizeURL, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the MyNewTaskModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-new-task-modal',
  templateUrl: 'my-new-task-modal.html',
})
export class MyNewTaskModalPage {

  
  validations_form: FormGroup;
  image: any;
  loading: any; 


  constructor(private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController) {

      this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.resetFields()
  }

  resetFields(){
    this.image = "./assets/imgs/default_image.jpg";
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required) // here
    });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit(value){
    
    let data = {
      title: value.title,
      description: value.description,
      image: this.image,
      location: value.location // here
    }
    console.log(data);
    this.firebaseService.createTask(data)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss();
      }
    )
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
  //     })
  // }


}
