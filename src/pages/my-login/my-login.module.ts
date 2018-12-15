import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyLoginPage } from './my-login';

@NgModule({
  declarations: [
    MyLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(MyLoginPage),
  ],
})
export class MyLoginPageModule {}
