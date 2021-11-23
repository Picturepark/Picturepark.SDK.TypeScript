import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  MatSlideToggleModule,
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
  ScrollingModule,
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class MaterialsModule {}
