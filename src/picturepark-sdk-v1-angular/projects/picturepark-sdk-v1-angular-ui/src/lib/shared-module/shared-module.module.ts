import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// MODULES
import { DialogModule } from './dialog/dialog.module';
import { MaterialsModule } from '../materials-module/materials-module.module';
import { NotificationModule } from './notification/notification.module';

// SERVICES
import { NotificationService } from './services/notification/notification.service';

// PIPES
import { FileSizePipe } from './pipes/filesize.pipe';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    // PIPES
    FileSizePipe,
    TranslatePipe
  ],
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialsModule,
    NotificationModule,
    CommonModule
  ],
  exports: [
    DialogModule,
    FormsModule,
    MaterialsModule,
    NotificationModule,
    // PIPES
    FileSizePipe,
    TranslatePipe
  ],
  providers: [
    NotificationService
  ]
})
export class SharedModule {}
