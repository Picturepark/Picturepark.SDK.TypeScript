import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialsModule } from '../../materials-module/materials-module.module';

// COMPONENTS
import { ApplicationMenuComponent } from './application-menu.component';

@NgModule({
  declarations: [
    ApplicationMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule
  ],
  exports: [
    MaterialsModule,
    ApplicationMenuComponent
  ]
})
export class ApplicationMenuModule { }
