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
  MatTableModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSortModule,
  MatSidenavModule
} from '@angular/material';

// CDK MODULES
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [],
  imports: [
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
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
    MatSidenavModule,
    // CDK
    CdkTableModule,
    LayoutModule,
    ScrollingModule
  ],
  exports: [
    MatChipsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
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
    MatSidenavModule,
    // CDK
    CdkTableModule,
    LayoutModule,
    ScrollingModule
  ]
})
export class MaterialsModule { }
