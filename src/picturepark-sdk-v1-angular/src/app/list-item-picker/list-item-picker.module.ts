import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import { SchemaBrowserModule, ListModule, ListBrowserModule, SearchBoxModule } from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ListItemPickerRoutingModule } from './list-item-picker-routing.module';

// COMPONENTS
import { ListItemPickerComponent } from './list-item-picker.component';
import { ListItemsPickerComponent } from './components/list-items-picker/list-items-picker.component';
import { ListItemBrowserComponent } from './components/list-item-browser/list-item-browser.component';
import { ApplicationHeaderModule } from '../components/application-header/application-header.module';

@NgModule({
  declarations: [ListItemPickerComponent, ListItemsPickerComponent, ListItemBrowserComponent],
  imports: [
    CommonModule,
    ListBrowserModule,
    ListModule,
    ListItemPickerRoutingModule,
    SchemaBrowserModule,
    SearchBoxModule,
    ApplicationHeaderModule,
  ],
})
export class ListItemPickerModule {}
