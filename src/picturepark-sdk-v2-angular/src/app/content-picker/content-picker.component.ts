import { Component, OnInit, OnDestroy, ViewChild, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// LIBRARIES
import { AggregationResult, Channel, Content, ContentSearchFacade, LanguageService } from '@picturepark/sdk-v2-angular';
import {
  SelectionService,
  BasketService,
  ContentBrowserComponent,
  SearchParameters,
  BaseComponent,
  ContentDetailsDialogOptions,
  TranslationService,
} from '@picturepark/sdk-v2-angular-ui';

// COMPONENTS
import { ContentDetailsDialogComponent } from '@picturepark/sdk-v2-angular-ui';

// SERVICES
import { EmbedService } from './embed.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './content-picker.component.html',
  styleUrls: ['./content-picker.component.scss'],
})
export class ContentPickerComponent extends BaseComponent implements OnInit, OnDestroy {
  itemsInBasket = '0';
  selectedItems: Content[] = [];
  selectedChannel: Channel | null = null;
  aggregations: AggregationResult[] = [];
  detailsItemId: string | undefined = undefined;
  loading = false;
  messagePosted = false;
  postUrl = '';

  @ViewChild(ContentBrowserComponent) contentBrowserComponent: ContentBrowserComponent;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private embedService: EmbedService,
    private basketService: BasketService,
    public facade: ContentSearchFacade,
    public selectionService: SelectionService<Content>,
    public languageService: LanguageService,
    private translationService: TranslationService,
    private titleService: Title
  ) {
    super(injector);
  }

  openDetails(item: Content) {
    let index = this.contentBrowserComponent.items.findIndex(q => q.id === item.id);

    this.dialog.open(ContentDetailsDialogComponent, {
      data: <ContentDetailsDialogOptions>{
        id: item.id,
        showMetadata: true,
        hasPrevious: () => {
          return index !== 0;
        },
        hasNext: () => {
          return this.contentBrowserComponent.facade.searchResultState.totalResults > index + 1;
        },
        previous: () => {
          index--;
          return of(this.contentBrowserComponent.items[index].id);
        },
        next: () => {
          index++;
          const content = this.contentBrowserComponent.items[index];

          if (content) {
            return of(content.id);
          }

          return this.contentBrowserComponent.loadData()?.pipe(map(() => this.contentBrowserComponent.items[index].id));
        },
      },
      autoFocus: false,
      width: '980px',
      height: '700px',
      panelClass: ['pp-dialog'],
    });
  }

  ngOnInit() {
    // Set application Title
    this.titleService.setTitle(this.translationService.translate('ApplicationTitle.contentPicker'));

    this.sub = this.basketService.basketChange.subscribe(items => (this.itemsInBasket = items.length.toString()));
    if (this.route.snapshot.queryParams['postUrl']) {
      this.postUrl = this.route.snapshot.queryParams['postUrl'];
    }
  }

  selectionChange(items: Content[]): void {
    this.selectedItems = items;
  }

  async embed() {
    try {
      this.loading = true;
      this.messagePosted = await this.embedService.embed(this.selectedItems, this.postUrl);
    } finally {
      this.loading = false;
    }
  }

  changeSearchParameters(searchParameters: SearchParameters) {
    this.facade.patchRequestState({
      searchString: searchParameters.searchString,
      searchMode: searchParameters.searchMode,
    });
  }

  changeChannel(channel: Channel) {
    this.selectedChannel = channel;
  }
}
