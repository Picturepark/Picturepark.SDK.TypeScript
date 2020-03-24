import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import {
  BasketModule, ContentAggregationListModule, ChannelPickerModule,
  ContentBrowserModule, SearchBoxModule, SharedModule, LayerPanelsModule, SearchSuggestBoxModule
} from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { ContentPickerRoutingModule } from './content-picker-routing.module';

// COMPONENTS
import { ContentPickerComponent } from './content-picker.component';

@NgModule({
  declarations: [
    ContentPickerComponent
  ],
  imports: [
    CommonModule,
    ContentPickerRoutingModule,
    SharedModule,
    BasketModule,
    ContentAggregationListModule,
    LayerPanelsModule,
    ChannelPickerModule,
    ContentBrowserModule,
    SearchBoxModule,
    SearchSuggestBoxModule
  ]
})
export class ContentPickerModule { }
