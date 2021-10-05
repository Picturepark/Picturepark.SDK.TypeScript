import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, SharedModule],
  exports: [NotificationComponent],
})
export class NotificationModule {}
