import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Subject } from 'rxjs';

// LIBRARIES
import { ThumbnailSize, IEntityBase } from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../browser-base/browser-base.component';
import { BaseComponent } from '../base.component';

@Component({
  template: '',
})
export abstract class BaseBrowserItemComponent<TEntity extends IEntityBase> extends BaseComponent {
  // INPUTS
  @Input() itemModel: TEntity;
  @Input() thumbnailSize: ThumbnailSize = ThumbnailSize.Medium;
  @Input() isListView: boolean;
  @Input() browser: BaseBrowserComponent<TEntity>;

  // OUTPUTS
  @Output() previewItemChange = new EventEmitter<TEntity>();

  protected isVisible = false;
  protected loadItem = new Subject<void>();

  markAsVisible() {
    this.isVisible = true;
    this.loadItem.next();
  }

  previewItem() {
    this.previewItemChange.emit(this.itemModel);
  }
}
