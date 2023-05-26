import { Component, Output, EventEmitter, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PICTUREPARK_UI_CONFIGURATION, ConfigActions } from '../../configuration';
import { BaseComponent } from '../../shared-module/components/base.component';
import { ShareContentDialogComponent } from '../../features-module/share-content-dialog/share-content-dialog.component';
import { BasketService } from '../../shared-module/services/basket/basket.service';
import { ContentDownloadDialogService } from '../content-download-dialog/services/content-download-dialog.service';
import { Content } from '@picturepark/sdk-v2-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    TranslatePipe,
    BasketItemComponent,
  ],
})
export class BasketComponent extends BaseComponent implements OnInit {
  private pictureParkUIConfig = inject(PICTUREPARK_UI_CONFIGURATION);
  private basketService = inject(BasketService);
  private contentDownloadDialogService = inject(ContentDownloadDialogService);
  private dialog = inject(MatDialog);

  @Output() previewItemChange = new EventEmitter<Content>();

  basketItems = toSignal(this.basketService.basketItemsChanges, { requireSync: true });
  configActions: ConfigActions;

  ngOnInit() {
    this.configActions = this.pictureParkUIConfig['BasketComponent'];
  }

  previewItem(item: Content): void {
    this.previewItemChange.emit(item);
  }

  downloadItems(): void {
    this.contentDownloadDialogService.showDialog({
      mode: 'multi',
      contents: [...this.basketItems()],
    });
  }

  openShareContentDialog(): void {
    const dialogRef = this.dialog.open(ShareContentDialogComponent, {
      data: [...this.basketItems()],
      autoFocus: false,
      maxHeight: '95vh',
      maxWidth: '99vw',
      width: '840px',
      panelClass: ['pp-dialog'],
    });
    dialogRef.componentInstance.title = 'Basket.Share';
  }

  trackByBasket(index: number, item: Content): string {
    return item.id;
  }

  clearBasket(): void {
    this.basketService.clearBasket();
  }
}
