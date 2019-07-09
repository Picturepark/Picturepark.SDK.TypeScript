import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { ApplicationMenuComponent } from './application-menu.component';

@NgModule({
  declarations: [
    ApplicationMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ApplicationMenuComponent
  ]
})
export class ApplicationMenuModule { }
