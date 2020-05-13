import { Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

// LIBRARIES
import { ThumbnailSize, IEntityBase } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../browser-base/browser-base.component';
import { BaseComponent } from '../base.component';

export abstract class BaseBrowserItemComponent<TEntity extends IEntityBase> extends BaseComponent {
  // INPUTS
  @Input() public itemModel: TEntity;
  @Input() thumbnailSize: ThumbnailSize = ThumbnailSize.Medium;
  @Input() isListView: boolean;
  @Input() browser: BaseBrowserComponent<TEntity>;

  // OUTPUTS
  @Output() public previewItemChange = new EventEmitter<TEntity>();

  protected isVisible = false;
  protected loadItem = new Subject<void>();

  public markAsVisible() {
    this.isVisible = true;
    this.loadItem.next();
  }

  public previewItem() {
    this.previewItemChange.emit(this.itemModel);
  }
}
