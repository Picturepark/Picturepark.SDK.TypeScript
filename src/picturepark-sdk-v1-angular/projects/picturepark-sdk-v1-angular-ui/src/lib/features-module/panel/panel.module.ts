import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { SharedModule } from '../../shared-module/shared-module.module';

// COMPONENTS
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { ItemsPanelComponent } from './components/items-panel/items-panel.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';
import { ItemPanelPreviewComponent } from './components/items-panel/components/item-panel-preview/item-panel-preview.component';
import { MailRecipientsPanelComponent } from './components/mail-recipients-panel/mail-recipients-panel.component';
import { HelpSupportResourcesComponent } from './components/help-support-resources/help-support-resources.component';
import { SystemInformationComponent } from './components/system-information/system-information.component';
import { CustomerSpecificTermsComponent } from './components/customer-specific-terms/customer-specific-terms.component';
import { YourPpSubscriptionComponent } from './components/your-pp-subscription/your-pp-subscription.component';
import { AboutPpComponent } from './components/about-pp/about-pp.component';
import { ThirdPartyLicensesCreditsComponent } from './components/third-party-licenses-credits/third-party-licenses-credits.component';

@NgModule({
  declarations: [
    ItemsPanelComponent,
    ItemPanelPreviewComponent,
    MailRecipientsPanelComponent,
    OwnerPanelComponent,
    SettingsPanelComponent,
    HelpSupportResourcesComponent,
    SystemInformationComponent,
    CustomerSpecificTermsComponent,
    YourPpSubscriptionComponent,
    AboutPpComponent,
    ThirdPartyLicensesCreditsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ItemsPanelComponent,
    ItemPanelPreviewComponent,
    MailRecipientsPanelComponent,
    OwnerPanelComponent,
    SettingsPanelComponent,
    HelpSupportResourcesComponent,
    SystemInformationComponent,
    CustomerSpecificTermsComponent,
    YourPpSubscriptionComponent,
    AboutPpComponent,
    ThirdPartyLicensesCreditsComponent
  ]
})
export class PanelModule { }
