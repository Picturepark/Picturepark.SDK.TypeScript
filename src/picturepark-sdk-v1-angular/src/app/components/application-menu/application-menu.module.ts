import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// COMPONENTS
import { ApplicationMenuComponent } from './application-menu.component';
import { MaterialsModule } from 'projects/picturepark-sdk-v1-angular-ui/src/lib/materials-module/materials-module.module';

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
