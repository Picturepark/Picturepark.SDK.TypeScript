import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared-module/components/base.component';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { BasketService } from '../../../../shared-module/services/basket/basket.service';
import { ContentItemThumbnailComponent } from '../../../../shared-module/components/content-item-thumbnail/content-item-thumbnail.component';
import { Content } from '@picturepark/sdk-v2-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pp-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslatePipe,
    ContentItemThumbnailComponent,
  ],
})
export class BasketItemComponent extends BaseComponent {
  private basketService = inject(BasketService);

  @Input() item: Content;

  remove() {
    this.basketService.removeItem(this.item.id);
  }
}
