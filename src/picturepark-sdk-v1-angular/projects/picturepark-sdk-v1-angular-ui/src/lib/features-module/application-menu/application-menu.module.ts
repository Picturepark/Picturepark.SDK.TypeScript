import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { ApplicationMenuComponent } from './application-menu.component';

@NgModule({
  declarations: [
    ApplicationMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ApplicationMenuComponent
  ]
})
export class ApplicationMenuModule { }
