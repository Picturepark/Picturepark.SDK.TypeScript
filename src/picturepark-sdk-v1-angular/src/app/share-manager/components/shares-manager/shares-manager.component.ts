import { Component, Inject, LOCALE_ID } from '@angular/core';

// LIBRARIES
import {
  Channel,
  AggregatorBase,
  TermsAggregator,
  NestedAggregator,
  ShareSearchFacade,
} from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-shares-manager',
  templateUrl: './shares-manager.component.html',
  styleUrls: ['./shares-manager.component.scss'],
})
export class SharesManagerComponent {
  public selectedChannel: Channel | null = null;
  public aggregators: AggregatorBase[] = [];

  constructor(@Inject(LOCALE_ID) public locale: string, public facade: ShareSearchFacade) {
    this.facade.searchInputState.aggregators = [
      new NestedAggregator({
        name: 'email',
        names: {
          'x-default': 'Recipients',
          ['en']: 'Recipients', // TODO BRO: Fix
        },
        path: 'data.mailRecipients',
        aggregators: [
          new TermsAggregator({
            field: 'data.mailRecipients.userEmail.emailAddress',
            name: 'email',
            names: {
              'x-default': 'Recipients',
              ['en']: 'Recipients', // TODO BRO: Fix
            },
            size: 10,
          }),
        ],
      }),
    ];
  }
}
