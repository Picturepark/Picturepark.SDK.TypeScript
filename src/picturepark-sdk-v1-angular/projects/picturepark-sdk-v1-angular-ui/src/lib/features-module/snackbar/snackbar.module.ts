import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SnackbarComponent } from './snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [SnackbarComponent],
})
export class SnackBarModule {}
