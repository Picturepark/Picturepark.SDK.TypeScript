import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// MODULES
import { MaterialsModule } from '../materials-module/materials-module.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialsModule
  ],
  exports: [
    FormsModule,
    MaterialsModule
  ]
})
export class SharedModule {}
