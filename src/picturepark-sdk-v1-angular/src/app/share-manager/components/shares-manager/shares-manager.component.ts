import { Component, OnInit } from '@angular/core';

// LIBRARIES
import {
  Channel,
  FilterBase,
  AggregatorBase,
  TermsAggregator,
  InfoService,
  NestedAggregator,
} from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-shares-manager',
  templateUrl: './shares-manager.component.html',
  styleUrls: ['./shares-manager.component.scss'],
})
export class SharesManagerComponent implements OnInit {
  public searchText = '';
  public selectedChannel: Channel | null = null;
  public selectedFilter: FilterBase | null = null;
  public aggregators: AggregatorBase[] = [];

  constructor(private infoService: InfoService) {}

  async ngOnInit() {
    const customerInfo = await this.infoService.getInfo().toPromise();

    this.aggregators = [
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
  }
}
