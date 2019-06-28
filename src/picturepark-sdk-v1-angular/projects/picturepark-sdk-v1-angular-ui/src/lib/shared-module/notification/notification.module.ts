import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { MaterialsModule } from '../../materials-module/materials-module.module';

// COMPONENTS
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
  ]
})
export class NotificationModule { }
