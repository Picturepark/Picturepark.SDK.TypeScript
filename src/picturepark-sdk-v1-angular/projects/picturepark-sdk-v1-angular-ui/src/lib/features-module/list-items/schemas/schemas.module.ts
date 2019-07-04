import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../../shared-module/shared-module.module';
import { SearchBoxModule } from '../../search-box/search-box.module';
import { SchemaBrowserModule } from '../../schema-browser/schema-browser.module';

// COMPONENTS
import { SchemasComponent } from './schemas.component';

@NgModule({
  declarations: [
    SchemasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchBoxModule,
    SchemaBrowserModule
  ],
  exports: [
    SchemasComponent
  ]
})
export class SchemasModule { }
