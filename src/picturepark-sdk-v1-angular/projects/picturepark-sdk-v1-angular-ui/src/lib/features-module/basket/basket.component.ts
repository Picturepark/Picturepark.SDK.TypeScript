import { Component, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// LIBRARIES
import { fetchContents} from '@picturepark/sdk-v1-angular';
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfiguration, ConfigActions } from '../../configuration';

// COMPONENTS
import { BaseComponent } from '../../shared-module/components/base.component';
import { ShareContentDialogComponent } from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../content-download-dialog/content-download-dialog.service';
import { ContentService } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent implements OnInit {

  public basketItemsIds: string[] = [];

  public configActions: ConfigActions;

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(
    @Inject(PICTUREPARK_UI_CONFIGURATION) private pictureParkUIConfig: PictureparkUIConfiguration,
    private basketService: BasketService,
    private contentService: ContentService,
    private contentDownloadDialogService: ContentDownloadDialogService,
    public dialog: MatDialog,
  ) {

    super();

    const basketSubscription = this.basketService.basketChange.subscribe(items => {
      this.basketItemsIds = items;
    });
    this.subscription.add(basketSubscription);
  }

  public previewItem(item: string): void {
    this.previewItemChange.emit(item);
  }

  public downloadItems(): void {
    const fetchContentsSubscription = fetchContents(this.contentService, this.basketItemsIds).subscribe( fetchResult => {
      this.contentDownloadDialogService.showDialog({
        mode: 'multi',
        contents: fetchResult.results
      });
    });
    this.subscription.add(fetchContentsSubscription);
  }

  public openShareContentDialog(): void {
    const fetchContentsSubscription = fetchContents(this.contentService, this.basketItemsIds).subscribe( fetchResult => {
      const dialogRef = this.dialog.open(ShareContentDialogComponent, {
        data: fetchResult.results,
        autoFocus: false
      });
      dialogRef.componentInstance.title = 'Basket.Share';
    });
    this.subscription.add(fetchContentsSubscription);
  }

  public clearBasket(): void {
    this.basketService.clearBasket();
  }

  public trackByBasket(index, basket: string): string {
    return basket;
  }

  ngOnInit() {
    this.configActions = this.pictureParkUIConfig['BasketComponent'];
  }
}
