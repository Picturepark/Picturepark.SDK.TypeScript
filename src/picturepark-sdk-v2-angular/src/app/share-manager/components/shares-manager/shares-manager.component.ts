import { Component, OnInit } from '@angular/core';

// LIBRARIES
import { TermsAggregator, InfoFacade, NestedAggregator, ShareSearchFacade } from '@picturepark/sdk-v2-angular';
import { firstValueFrom } from 'rxjs';
import { TranslatePipe } from '../../../../../projects/picturepark-sdk-v2-angular-ui/src/lib/shared-module/pipes/translate.pipe';
import { AggregationListComponent } from '../../../../../projects/picturepark-sdk-v2-angular-ui/src/lib/shared-module/components/aggregation-list/aggregation-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ShareBrowserComponent } from '../../../../../projects/picturepark-sdk-v2-angular-ui/src/lib/features-module/share-browser/share-browser.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-shares-manager',
    templateUrl: './shares-manager.component.html',
    styleUrls: ['./shares-manager.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        ShareBrowserComponent,
        MatTabsModule,
        AggregationListComponent,
        TranslatePipe,
    ],
})
export class SharesManagerComponent implements OnInit {
  initialized = false;

  constructor(public facade: ShareSearchFacade, private infoFacade: InfoFacade) {}
  async ngOnInit() {
    const customerInfo = await firstValueFrom(this.infoFacade.getInfo());
    const recipientsAggregator = [
      new NestedAggregator({
        name: 'email',
        names: {
          'x-default': 'Recipients',
          [customerInfo.languageConfiguration.defaultLanguage]: 'Recipients',
        },
        path: 'data.mailRecipients',
        aggregators: [
          new TermsAggregator({
            field: 'data.mailRecipients.userEmail.emailAddress',
            name: 'email',
            names: {
              'x-default': 'Recipients',
              [customerInfo.languageConfiguration.defaultLanguage]: 'Recipients',
            },
            size: 10,
          }),
        ],
        uiBehavior: { enableFilter: true, enableSearchInFilter: true, enableSuggestions: false },
      }),
    ];

    this.facade.patchRequestState({
      aggregators: recipientsAggregator,
    });

    this.initialized = true;
  }
}
