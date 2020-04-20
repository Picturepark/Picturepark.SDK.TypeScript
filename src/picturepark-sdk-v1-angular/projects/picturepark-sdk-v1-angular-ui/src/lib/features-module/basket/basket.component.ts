import { Component, Output, EventEmitter, OnInit, Inject, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// LIBRARIES
import { fetchContents } from '@picturepark/sdk-v1-angular';
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfiguration, ConfigActions } from '../../configuration';

// COMPONENTS
import { BaseComponent } from '../../shared-module/components/base.component';
import { ShareContentDialogComponent } from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../content-download-dialog/content-download-dialog.service';
import { ContentService, Content } from '@picturepark/sdk-v1-angular';
import { ContentModel } from '../../shared-module/models/content-model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent extends BaseComponent implements OnInit {
  public basketItemsIds: string[] = [];

  public configActions: ConfigActions;

  @Output()
  public previewItemChange = new EventEmitter<ContentModel<Content>>();

  constructor(
    @Inject(PICTUREPARK_UI_CONFIGURATION) private pictureParkUIConfig: PictureparkUIConfiguration,
    private basketService: BasketService,
    private contentService: ContentService,
    private contentDownloadDialogService: ContentDownloadDialogService,
    protected injector: Injector,
    public dialog: MatDialog
  ) {
    super(injector);

    this.sub = this.basketService.basketChange.subscribe(itemsIds => {
      this.basketItemsIds = itemsIds;
    });
  }

  public previewItem(itemId: string): void {
    // TODO SAN deal with this
    // this.previewItemChange.emit(new ContentModel(item, true));
  }

  public downloadItems(): void {
    fetchContents(this.contentService, this.basketItemsIds).subscribe(fetchResult => {
      this.contentDownloadDialogService.showDialog({
        mode: 'multi',
        contents: fetchResult.results,
      });
    });
  }

  public openShareContentDialog(): void {
    fetchContents(this.contentService, this.basketItemsIds).subscribe(fetchResult => {
      const dialogRef = this.dialog.open(ShareContentDialogComponent, {
        data: fetchResult.results,
        autoFocus: false,
      });
      dialogRef.componentInstance.title = 'Basket.Share';
    });
  }

  public clearBasket(): void {
    this.basketService.clearBasket();
  }

  // Handle TrackBy
  // public trackByBasket(index, basketItem: Content): string {
  //   return basketItem.id;
  // }

  ngOnInit() {
    this.configActions = this.pictureParkUIConfig['BasketComponent'];
  }
}
