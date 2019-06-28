import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { NotificationModule } from '../notification/notification.module';
import { MaterialsModule } from '../../materials-module/materials-module.module';

// COMPONENTS
import { DialogBaseComponent } from './components/dialog-base/dialog-base.component';
import { ShareContentDialogComponent } from './components/share-dialog-component/share-dialog-component.component';

@NgModule({
  declarations: [
    DialogBaseComponent,
    ShareContentDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    NotificationModule,
  ],
  exports: [
    DialogBaseComponent,
    ShareContentDialogComponent
  ],
  entryComponents: [
    ShareContentDialogComponent,
  ]
})
export class DialogModule {}
