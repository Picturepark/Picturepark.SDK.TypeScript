import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular material dependencies
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from  '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';


// SDK components
import { ContentAggregationComponent } from './components/content-aggregation-list/content-aggregation/content-aggregation.component';
import { ContentAggregationListComponent } from './components/content-aggregation-list/content-aggregation-list.component';
import { ContentDownloadDialogComponent } from './components/content-download-dialog/content-download-dialog.component';
import { BasketItemComponent } from './components/basket/basket-item/basket-item.component';
import { BasketComponent } from './components/basket/basket.component';
import { ChannelPickerComponent } from './components/channel-picker/channel-picker.component';
import { ContentBrowserComponent } from './components/content-browser/content-browser.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ContentBrowserItemComponent } from './components/content-browser/content-browser-item/content-browser-item.component';
import { OutputDownloadMenuComponent } from './components/output-download-menu/output-download-menu.component';
import { LayerPanelsComponent } from './components/layer-panels/layer-panels.component';
import { FieldDetailInfoDialogComponent } from './components/layer-panels/field-detail-info-dialog/field-detail-info-dialog.component';
import { ListItemAggregationComponent } from './components/list-item-aggregation-list/list-item-aggregation/list-item-aggregation.component';
import { ListItemAggregationListComponent } from './components/list-item-aggregation-list/list-item-aggregation-list.component';
import { ShareImagesDialogComponent } from './components/share-images-dialog/share-images-dialog.component';
import { ShareImagesDialogItemComponent } from './components/share-images-dialog/share-images-dialog-item/share-images-dialog-item.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

// SDK services
import { ContentItemSelectionService } from './services/content-item-selection.service';
import { BasketService } from './services/basket.service';
import { LiquidRenderingService } from './services/liquid-rendering.service';

// SDK pipes
import { FileSizePipe } from './pipes/filesize.pipe';
import { TranslatePipe } from './pipes/translate.pipe';

// SDK directives
import { LazyLoadDirective } from './directives/lazy-load.directive';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

@NgModule({
  declarations: [
    ChannelPickerComponent,
    ContentBrowserComponent,
    SearchBoxComponent,
    ContentAggregationComponent,
    ContentAggregationListComponent,
    ListItemAggregationComponent,
    ListItemAggregationListComponent,
    ContentBrowserItemComponent,
    BasketComponent,
    BasketItemComponent,
    OutputDownloadMenuComponent,
    TranslatePipe,
    LazyLoadDirective,
    LayerPanelsComponent,
    FieldDetailInfoDialogComponent,
    ShareImagesDialogComponent,
    ShareImagesDialogItemComponent,
    DatePickerComponent,
    ContentDownloadDialogComponent,
    FileSizePipe
  ],
  providers: [
    ContentItemSelectionService,
    BasketService,
    LiquidRenderingService,
    MatDatepickerModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    ScrollingModule
  ],
  exports: [
    ChannelPickerComponent,
    ContentBrowserComponent,
    SearchBoxComponent,
    LayerPanelsComponent,
    ContentAggregationListComponent,
    ListItemAggregationListComponent,
    BasketComponent,
    OutputDownloadMenuComponent,
    TranslatePipe,
    FileSizePipe,
    CommonModule,
    ContentDownloadDialogComponent,
  ],
  entryComponents: [
    FieldDetailInfoDialogComponent,
    ShareImagesDialogComponent,
    ShareImagesDialogItemComponent,
    ContentDownloadDialogComponent
  ]
})
export class PictureparkUiModule {
}
