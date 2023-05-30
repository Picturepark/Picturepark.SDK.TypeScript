import { Component, OnInit } from '@angular/core';
import { TermsAggregator, InfoFacade, NestedAggregator, ShareSearchFacade } from '@picturepark/sdk-v2-angular';
import { firstValueFrom } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { AggregationListComponent, ShareBrowserComponent, TranslatePipe } from '@picturepark/sdk-v2-angular-ui';

@Component({
  selector: 'app-shares-manager',
  templateUrl: './shares-manager.component.html',
  styleUrls: ['./shares-manager.component.scss'],
  standalone: true,
  imports: [CommonModule, ShareBrowserComponent, MatTabsModule, AggregationListComponent, TranslatePipe],
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
