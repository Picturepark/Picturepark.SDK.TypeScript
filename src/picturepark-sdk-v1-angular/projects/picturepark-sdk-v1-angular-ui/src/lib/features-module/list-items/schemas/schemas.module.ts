import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { SchemasComponent } from './schemas.component';

@NgModule({
  declarations: [
    SchemasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SchemasComponent
  ]
})
export class SchemasModule { }
