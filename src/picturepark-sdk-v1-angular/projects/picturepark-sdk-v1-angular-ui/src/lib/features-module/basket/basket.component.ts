import { Component, Output, EventEmitter, OnInit, Inject, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// LIBRARIES
import { PICTUREPARK_UI_CONFIGURATION, PictureparkUIConfiguration, ConfigActions } from '../../configuration';

// COMPONENTS
import { BaseComponent } from '../../shared-module/components/base.component';
import { ShareContentDialogComponent } from '../../features-module/share-content-dialog/share-content-dialog.component';

// SERVICES
import { BasketService } from '../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../content-download-dialog/content-download-dialog.service';
import { Content } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent extends BaseComponent implements OnInit {
  public basketItems: Content[] = [];

  public configActions: ConfigActions;

  @Output()
  public previewItemChange = new EventEmitter<Content>();

  constructor(
    @Inject(PICTUREPARK_UI_CONFIGURATION) private pictureParkUIConfig: PictureparkUIConfiguration,
    private basketService: BasketService,
    private contentDownloadDialogService: ContentDownloadDialogService,
    protected injector: Injector,
    public dialog: MatDialog
  ) {
    super(injector);

    this.sub = this.basketService.basketItemsChanges.subscribe((items) => (this.basketItems = items));
  }

  public previewItem(item: Content): void {
    this.previewItemChange.emit(item);
  }

  public downloadItems(): void {
    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: this.basketItems,
    });
  }

  public openShareContentDialog(): void {
    const dialogRef = this.dialog.open(ShareContentDialogComponent, {
      data: this.basketItems,
      autoFocus: false,
    });
    dialogRef.componentInstance.title = 'Basket.Share';
  }

  trackByBasket(index: number, item: Content): string {
    return item.id;
  }

  public clearBasket(): void {
    this.basketService.clearBasket();
  }

  ngOnInit() {
    this.configActions = this.pictureParkUIConfig['BasketComponent'];
  }
}
