import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../pages/profile/profile';
import { AddFriendPage } from '../pages/add-friend/add-friend';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = "MyLoginPage";

  pages: Array<{ title: string, name: string, component: any , icon: any, index: any }>;

  constructor(private platform: Platform, private  statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'Profile',name: 'ProfilePage', component: 'ProfilePage', icon: 'md-contact', index: 0},
      { title: 'Home',name: 'MyMenuPage', component: 'MyMenuPage', icon: 'md-home', index: 1},
      { title: 'Add Friend',name: 'AddFriendPage', component: 'AddFriendPage', icon: 'md-people', index: 2}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {


    //7.1 The index is equal to the order of our tabs inside tabs.ts
    let params = {};
    
    //7.2 The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { targetTabIndex: page.index }; //this parameter will be pass when TabPage is constructed
    }
    
    //7.3 The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
    // Tabs are not active, so reset the root page 
    // In this case: moving to or from SpecialPage
         console.log(params);
         this.nav.setRoot(page.name, params); //change page and passing targetTabIndex
      }
    }

  isActive(page) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];
    
    if (childNav) {
    if (childNav.getSelected() && childNav.getSelected().root === page.component) {
    return 'primary';
    }
    return;
    }
    
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
    return 'primary';
    }
    return;
    }
}
