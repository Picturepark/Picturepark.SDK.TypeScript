import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '@picturepark/sdk-v1-angular-ui/public_api';

// COMPONENTS
import { SchemaBrowserComponent } from './schema-browser.component';
import { SchemaBrowserItemComponent } from './components/schema-browser-item/schema-browser-item.component';

@NgModule({
  declarations: [
    SchemaBrowserComponent,
    SchemaBrowserItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SchemaBrowserComponent,
    SchemaBrowserItemComponent
  ]
})
export class SchemaBrowserModule { }
