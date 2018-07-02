import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';


import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { ShareCardComponent } from '../components/share-card/share-card.component';
import { ChannelPickerComponent } from '../components/channel-picker/channel-picker.component';
import { ContentBrowserComponent } from '../components/content-browser/content-browser.component';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { AggregationFilterComponent } from '../components/aggregation-filter/aggregation-filter.component';
import { ContentBrowserItemComponent } from '../components/content-browser-item/content-browser-item.component';
import { TranslatePipe } from '../pipes/translate.pipe';
import { AggregationComponent } from '../components/aggregation-filter/aggregation/aggregation.component';

// IMPORTANT: Update docs/picturepark-sdk-v1-angular/modules.md when changing modules

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ShareCardComponent,
    ChannelPickerComponent,
    ContentBrowserComponent,
    SearchBoxComponent,
    AggregationComponent,
    AggregationFilterComponent,
    ContentBrowserItemComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ScrollDispatchModule
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    ShareCardComponent,
    ChannelPickerComponent,
    ContentBrowserComponent,
    SearchBoxComponent,
    AggregationFilterComponent,

    TranslatePipe
  ]
})
export class PictureparkUiModule {

}
