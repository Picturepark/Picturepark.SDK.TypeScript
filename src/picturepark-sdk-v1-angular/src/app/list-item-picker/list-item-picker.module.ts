import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import { ApplicationHeaderModule, SchemaBrowserModule, ListModule, ListBrowserModule, SearchBoxModule } from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ListItemPickerRoutingModule } from './list-item-picker-routing.module';

// COMPONENTS
import { ListItemPickerComponent } from './list-item-picker.component';
import { ListItemsPickerComponent } from './components/list-items-picker/list-items-picker.component';
import { ListItemBrowserComponent } from './components/list-item-browser/list-item-browser.component';

@NgModule({
  declarations: [ListItemPickerComponent, ListItemsPickerComponent, ListItemBrowserComponent],
  imports: [CommonModule, ApplicationHeaderModule, ListBrowserModule, ListModule, ListItemPickerRoutingModule, SchemaBrowserModule, SearchBoxModule]
})
export class ListItemPickerModule {}
