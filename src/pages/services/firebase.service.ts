import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

//where we have everything related to the CRUD logic.
@Injectable()
export class FirebaseService {

  result: any;

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}

// Once we’ve created one or more tasks, we’ll be able to list them. 
// To get all the user tasks we’ll implement a getTasks() method in the service.
  getTasks(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.email).collection('tasks').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

    getFriend(userId: string){
    return new Promise<any>((resolve, reject) => {
      //let currentUser = firebase.auth().currentUser;
      // this.afs.collection('people', ref => ref.where('email', '==', 'viptest5@hotmail.com')).snapshotChanges()
      // .subscribe(snapshots => {
      //   resolve(snapshots);
      // })
      // Create a reference to the cities collection

      this.snapshotChangesSubscription = this.afs.collection('people').doc(userId).collection('tasks').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.email).collection('tasks').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteTask(taskKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.email).collection('tasks').doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }


  // the tasks are going to be assigned to the logged-in user,
  // so we’ll use the firebase.auth().currentUser method to get their uid.
  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.email).collection('tasks').add({
        title: value.title,
        date: value.date,
        location: value.location,
        description: value.description,
       
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }



}
