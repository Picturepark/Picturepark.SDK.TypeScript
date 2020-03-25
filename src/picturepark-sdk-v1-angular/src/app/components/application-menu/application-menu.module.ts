import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { ApplicationMenuComponent } from './application-menu.component';

// Materials
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ApplicationMenuComponent],
  imports: [CommonModule, RouterModule, MatSlideToggleModule, MatTooltipModule],
  exports: [ApplicationMenuComponent],
})
export class ApplicationMenuModule {}
