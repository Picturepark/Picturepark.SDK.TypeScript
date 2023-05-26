import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import {
  BasketComponent,
  AggregationListModule,
  ChannelPickerModule,
  ContentBrowserModule,
  SearchBoxModule,
  SharedModule,
  LayerPanelsModule,
  SearchSuggestBoxModule,
  LanguageSwitchModule,
} from '@picturepark/sdk-v2-angular-ui';

// MODULES
import { ContentPickerRoutingModule } from './content-picker-routing.module';

// COMPONENTS
import { ContentPickerComponent } from './content-picker.component';

@NgModule({
  declarations: [ContentPickerComponent],
  imports: [
    CommonModule,
    ContentPickerRoutingModule,
    SharedModule,
    BasketComponent,
    AggregationListModule,
    LayerPanelsModule,
    ChannelPickerModule,
    ContentBrowserModule,
    SearchBoxModule,
    SearchSuggestBoxModule,
    LanguageSwitchModule,
  ],
})
export class ContentPickerModule {}
