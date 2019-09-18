import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatRadioModule,
} from '@angular/material';

const modules = [
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
  MatFormFieldModule,
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
  MatRadioModule,
  // CDK
  CdkTableModule,
  LayoutModule,
  ScrollingModule];

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialsModule { }
