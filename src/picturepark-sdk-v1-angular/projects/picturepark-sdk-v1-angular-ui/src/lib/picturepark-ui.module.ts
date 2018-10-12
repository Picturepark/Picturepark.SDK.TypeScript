import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material dependencies
import { MatMenuModule } from '@angular/material/menu';
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
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

// SDK components
import { ContentAggregationComponent } from './components/content-aggregation-list/content-aggregation/content-aggregation.component';
import { ContentAggregationListComponent } from './components/content-aggregation-list/content-aggregation-list.component';
import { BasketItemComponent } from './components/basket/basket-item/basket-item.component';
import { BasketComponent } from './components/basket/basket.component';
import { ChannelPickerComponent } from './components/channel-picker/channel-picker.component';
import { ContentBrowserComponent } from './components/content-browser/content-browser.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ContentBrowserItemComponent } from './components/content-browser/content-browser-item/content-browser-item.component';

// SDK pipes
import { TranslatePipe } from './pipes/translate.pipe';

import { ContentItemSelectionService } from './services/content-item-selection.service';
import { BasketService } from './services/basket.service';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

@NgModule({
  declarations: [
    ChannelPickerComponent,
    ContentBrowserComponent,
    SearchBoxComponent,
    ContentAggregationComponent,
    ContentAggregationListComponent,
    ContentBrowserItemComponent,
    BasketComponent,
    BasketItemComponent,
    TranslatePipe
  ],
  providers: [
    ContentItemSelectionService,
    BasketService
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
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
    ScrollDispatchModule
  ],
  exports: [
    ChannelPickerComponent,
    ContentBrowserComponent,
    SearchBoxComponent,
    ContentAggregationListComponent,
    BasketComponent,
    TranslatePipe
  ]
})
export class PictureparkUiModule {
}
