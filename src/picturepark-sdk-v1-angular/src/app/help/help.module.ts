import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// LIBRARIES
import { ItemToolBarModule, PanelModule } from '@picturepark/sdk-v1-angular-ui';

// MODULES
import { HelpRoutingModule } from './help-routing.module';

// COMPONENTS
import { AboutPpComponent } from './components/about-pp/about-pp.component';
import { CustomerSpecificTermsComponent } from './components/customer-specific-terms/customer-specific-terms.component';
import { HelpComponent } from './components/help/help.component';
import { HelpSupportResourcesComponent } from './components/help-support-resources/help-support-resources.component';
import { HelpWrapperComponent } from './help-wrapper.component';
import { SystemInformationComponent } from './components/system-information/system-information.component';
import { ThirdPartyLicensesCreditsComponent } from './components/third-party-licenses-credits/third-party-licenses-credits.component';
import { YourPpSubscriptionComponent } from './components/your-pp-subscription/your-pp-subscription.component';
import { ApplicationHeaderModule } from '../components/application-header/application-header.module';

@NgModule({
  declarations: [
    AboutPpComponent,
    CustomerSpecificTermsComponent,
    HelpSupportResourcesComponent,
    HelpWrapperComponent,
    HelpComponent,
    SystemInformationComponent,
    ThirdPartyLicensesCreditsComponent,
    YourPpSubscriptionComponent,
  ],
  imports: [CommonModule, HelpRoutingModule, ItemToolBarModule, PanelModule, ApplicationHeaderModule],
})
export class HelpModule {}
