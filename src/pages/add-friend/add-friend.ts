import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

/**
 * Generated class for the AddFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {

  myInput: string;
  items: Array<any>; 
  

  //=======search bar

  searchQuery: string = '';
  things: string[];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    
    ) {
      this.searchQuery = '';
      this.initializeItems();
      
  }

//search
  initializeItems() {
    this.things = [
      'Amsterdam',
      'Bogota',
      'bangkok',
      'slovakia',
      'brazil'
    ];
  }

  


  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendPage');
  }

  //search
  getThings(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = this.searchQuery;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.things = this.things.filter((v) => {
      if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
       
        return true;
      }
      return false;
    })
    this.getData();
  }



  getData(){
    
    this.firebaseService.getFriend(this.searchQuery)
    .then(tasks => {
      this.items = tasks;
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
}
