import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNewTaskModalPage } from './my-new-task-modal';

@NgModule({
  declarations: [
    MyNewTaskModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNewTaskModalPage),
  ],
})
export class MyNewTaskModalPageModule {}
