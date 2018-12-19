import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, Nav } from 'ionic-angular';

import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';




@IonicPage()
@Component({
  selector: 'page-my-menu',
  templateUrl: 'my-menu.html',
})
export class MyMenuPage {
 

  items: Array<any>;
  itemsCreate: Array<any>;

  // test form 
  
  
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService) {
  }


  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.firebaseService.getTasks()
      .then(tasks => {
        this.items = tasks;
      })
  }

  getDataCreate() {
    this.firebaseService.getTasks()
      .then(tasks => {
        this.itemsCreate = tasks;
      })
  }

  goVote(id, item) {
    // debugger
    let data = {
      title: item.title,
      date: item.date,
      description: item.description,
      location: item.location, // here
      id: id
    }
    this.navCtrl.push("VotePage", {
      data: data
    })
  }

  viewDetails(id, item) {
    // debugger
    let data = {
      title: item.title,
      date: item.date,
      description: item.description,
      location: item.location, // here
      id: id
    }
    this.navCtrl.push("MyDetailPage", {
      data: data
    })
  }

  openNewUserModal() {
    let modal = this.modalCtrl.create("MyNewTaskModalPage");
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }




  // click fab button 
  goCreatePage() {
    // go to create page using modal  
    let modal = this.modalCtrl.create("CreatePage");
    //return back to create page with the data from firebase 
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }


  logout() {
    this.authService.doLogout()
      .then(res => {
        this.navCtrl.push("MyLoginPage");
      })
  }

}
