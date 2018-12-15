import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDetailPage } from './my-detail';

@NgModule({
  declarations: [
    MyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDetailPage),
  ],
})
export class MyDetailPageModule {}
