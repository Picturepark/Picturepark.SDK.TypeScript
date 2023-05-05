import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { SharedModule } from '../../shared-module/shared-module.module';
import { LandingDialogComponent } from './landing-dialog.component';

@NgModule({
  declarations: [LandingDialogComponent],
  imports: [CommonModule, SharedModule, MatSlideToggleModule],
  exports: [LandingDialogComponent],
})
export class LandingDialogModule {}
