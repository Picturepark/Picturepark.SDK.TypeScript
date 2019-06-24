import { NgModule } from '@angular/core';

// MATERIAL MODULES
import {
  MatTabsModule,
  MatBadgeModule,
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule 
} from '@angular/material';

// CDK MODULES
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    // CDK
    LayoutModule,
    ScrollingModule
  ],
  exports: [
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    // CDK
    LayoutModule,
    ScrollingModule
  ]
})
export class MaterialsModule { }
