import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { ToolBarComponent } from './tool-bar.component';

@NgModule({
  declarations: [
    ToolBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToolBarComponent
  ]
})
export class ToolBarModule { }
