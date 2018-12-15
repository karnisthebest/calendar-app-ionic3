import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRegisterPage } from './my-register';

@NgModule({
  declarations: [
    MyRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRegisterPage),
  ],
})
export class MyRegisterPageModule {}
