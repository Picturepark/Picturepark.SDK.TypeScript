import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { ContentPickerComponent } from './content-picker.component';

@NgModule({
  declarations: [
    ContentPickerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ContentPickerComponent
  ]
})
export class ContentPickerModule { }
