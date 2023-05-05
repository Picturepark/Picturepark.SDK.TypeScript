import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { ApplicationMenuComponent } from './application-menu.component';

// Materials
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  declarations: [ApplicationMenuComponent],
  imports: [CommonModule, RouterModule, MatSlideToggleModule, MatTooltipModule],
  exports: [ApplicationMenuComponent],
})
export class ApplicationMenuModule {}
