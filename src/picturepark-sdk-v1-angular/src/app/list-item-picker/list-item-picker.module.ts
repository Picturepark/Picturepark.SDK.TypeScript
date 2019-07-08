import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import { SchemaBrowserModule } from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ListItemPickerRoutingModule } from './list-item-picker-routing.module';

// COMPONENTS
import { ListItemPickerComponent } from './list-item-picker.component';
import { ListItemBrowserComponent } from './components/list-item-browser/list-item-browser.component';

@NgModule({
  declarations: [
    ListItemPickerComponent,
    ListItemBrowserComponent,
  ],
  imports: [
    CommonModule,
    ListItemPickerRoutingModule,
    SchemaBrowserModule
  ]
})
export class ListItemPickerModule { }
