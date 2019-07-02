import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { OutputDownloadMenuComponent } from './output-download-menu.component';

@NgModule({
  declarations: [
    OutputDownloadMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    OutputDownloadMenuComponent
  ]
})
export class OutputDownloadMenuModule { }
