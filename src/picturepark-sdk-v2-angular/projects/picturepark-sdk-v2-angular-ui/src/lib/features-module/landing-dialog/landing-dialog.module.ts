import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '../../shared-module/shared-module.module';
import { LandingDialogComponent } from './landing-dialog.component';

@NgModule({
    imports: [CommonModule, SharedModule, MatSlideToggleModule, LandingDialogComponent],
    exports: [LandingDialogComponent],
})
export class LandingDialogModule {}
