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
import { Content } from '@picturepark/sdk-v1-angular';
import { ContentModel } from '@picturepark/sdk-v1-angular-ui';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent implements OnInit {

  public basketItems: Content[] = [];


  public configActions: ConfigActions;

  @Output()
  public previewItemChange = new EventEmitter<ContentModel<Content>>();

  constructor(
    @Inject(PICTUREPARK_UI_CONFIGURATION) private pictureParkUIConfig: PictureparkUIConfiguration,
    private basketService: BasketService,
    private contentService: ContentService,
    private contentDownloadDialogService: ContentDownloadDialogService,
    public dialog: MatDialog,
  ) {

    super();

    const basketSubscription = this.basketService.basketChange.subscribe(async ( itemsIds ) => {
      const fetchContentsSubscription = fetchContents(this.contentService, itemsIds).subscribe( ( fetchResult ) => {
        this.basketItems = fetchResult.results;
      });
      this.subscription.add(fetchContentsSubscription);
    });
    this.subscription.add(basketSubscription);
  }

  public previewItem(item: Content): void {
    this.previewItemChange.emit(new ContentModel(item, false));
  }

  public downloadItems(): void {
      this.contentDownloadDialogService.showDialog({
        mode: 'multi',
        contents: this.basketItems
      });
  }

  public openShareContentDialog(): void {
      const dialogRef = this.dialog.open(ShareContentDialogComponent, {
        data: this.basketItems,
        autoFocus: false
      });
      dialogRef.componentInstance.title = 'Basket.Share';
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
