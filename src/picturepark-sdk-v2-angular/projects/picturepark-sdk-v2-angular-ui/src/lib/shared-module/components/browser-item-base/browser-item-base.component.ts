import { Input, Output, EventEmitter, signal, Directive } from '@angular/core';
import { Subject } from 'rxjs';
import { ThumbnailSize, IEntityBase } from '@picturepark/sdk-v2-angular';
import { BaseBrowserComponent } from '../browser-base/browser-base.component';
import { BaseComponent } from '../base.component';

@Directive()
export abstract class BaseBrowserItemComponent<TEntity extends IEntityBase> extends BaseComponent {
  @Input() itemModel: TEntity;
  @Input() thumbnailSize: ThumbnailSize = ThumbnailSize.Medium;
  @Input() isListView: boolean;
  @Input() browser: BaseBrowserComponent<TEntity>;

  @Output() previewItemChange = new EventEmitter<TEntity>();

  protected isVisible = signal(false);
  protected loadItem = new Subject<void>();

  markAsVisible() {
    this.isVisible.set(true);
    this.loadItem.next();
  }

  previewItem() {
    this.previewItemChange.emit(this.itemModel);
  }
}
