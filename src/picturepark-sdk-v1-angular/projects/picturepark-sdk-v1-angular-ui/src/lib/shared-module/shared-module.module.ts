import { NgModule, ModuleWithProviders } from '@angular/core';
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
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialsModule,
    NotificationModule
  ],
  exports: [
    DialogModule,
    FormsModule,
    MaterialsModule,
    NotificationModule,
    // PIPES
    FileSizePipe,
    TranslatePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        NotificationService,
      ]
    };
  }
}
