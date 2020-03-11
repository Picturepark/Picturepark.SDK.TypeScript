import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// COMPONENTS
import { ApplicationHeaderComponent } from './application-header/application-header.component';
import { ApplicationMenuComponent } from './application-menu/application-menu.component';


@NgModule({
  declarations: [
    ApplicationHeaderComponent,
    ApplicationMenuComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
  ],
  exports: [
    ApplicationHeaderComponent,
    ApplicationMenuComponent
  ],
})
export class ComponentsModule { }
