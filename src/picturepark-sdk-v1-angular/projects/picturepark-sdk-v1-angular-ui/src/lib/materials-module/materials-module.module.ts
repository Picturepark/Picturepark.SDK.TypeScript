import { NgModule } from '@angular/core';

// MATERIAL MODULES
import {
  MatChipsModule,
  MatMenuModule,
  MatDatepickerModule,
  MatTabsModule,
  MatNativeDateModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatDividerModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatCheckboxModule,
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
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCheckboxModule,
    // CDK
    LayoutModule,
    ScrollingModule
  ],
  exports: [
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCheckboxModule,
    // CDK
    LayoutModule,
    ScrollingModule
  ]
})
export class MaterialsModule { }
