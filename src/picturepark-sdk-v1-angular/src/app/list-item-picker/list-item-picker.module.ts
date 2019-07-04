import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import { ListItemsModule } from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ListItemPickerRoutingModule } from './list-item-picker-routing.module';

// COMPONENTS
import { ListItemPickerComponent } from './list-item-picker.component';

@NgModule({
  declarations: [
    ListItemPickerComponent,
  ],
  imports: [
    CommonModule,
    ListItemPickerRoutingModule,
    ListItemsModule
  ]
})
export class ListItemPickerModule { }
