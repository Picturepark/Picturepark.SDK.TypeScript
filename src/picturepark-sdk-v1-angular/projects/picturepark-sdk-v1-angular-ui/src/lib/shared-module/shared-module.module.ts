import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// MODULES
import { MaterialsModule } from '../materials-module/materials-module.module';

// PIPES
import { FileSizePipe } from './pipes/filesize.pipe';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    // PIPES
    FileSizePipe,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialsModule,
  ],
  exports: [
    FormsModule,
    MaterialsModule,
    // PIPES
    FileSizePipe,
    TranslatePipe
  ]
})
export class SharedModule {}
