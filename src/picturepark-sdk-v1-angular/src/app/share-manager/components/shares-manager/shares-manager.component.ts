import { Component, OnInit } from '@angular/core';

// LIBRARIES
import { TermsAggregator, InfoFacade, NestedAggregator, ShareSearchFacade } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-shares-manager',
  templateUrl: './shares-manager.component.html',
  styleUrls: ['./shares-manager.component.scss'],
})
export class SharesManagerComponent implements OnInit {
  initialized = false;

  constructor(public facade: ShareSearchFacade, private infoFacade: InfoFacade) {}
  async ngOnInit() {
    const customerInfo = await this.infoFacade.getInfo().toPromise();
    this.facade.searchRequestState.aggregators = [
      new NestedAggregator({
        name: 'email',
        names: {
          'x-default': 'Recipients',
          [customerInfo.languageConfiguration.defaultLanguage!]: 'Recipients',
        },
        path: 'data.mailRecipients',
        aggregators: [
          new TermsAggregator({
            field: 'data.mailRecipients.userEmail.emailAddress',
            name: 'email',
            names: {
              'x-default': 'Recipients',
              [customerInfo.languageConfiguration.defaultLanguage!]: 'Recipients',
            },
            size: 10,
          }),
        ],
      }),
    ];
    this.initialized = true;
  }
}
