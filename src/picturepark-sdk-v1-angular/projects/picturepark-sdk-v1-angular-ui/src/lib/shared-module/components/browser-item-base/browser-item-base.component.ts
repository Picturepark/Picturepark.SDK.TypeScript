import { Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

// LIBRARIES
import { ThumbnailSize } from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../base.component';

// INTERFACES
import { ContentModel } from '../../models/content-model';

export abstract class BaseBrowserItemComponent<TEntity extends { id: string }> extends BaseComponent {
    // INPUTS
    @Input() public itemModel: ContentModel<TEntity>;
    @Input() thumbnailSize: ThumbnailSize | null;
    @Input() isListView: boolean;

    // OUTPUTS
    @Output() public previewItemChange = new EventEmitter<ContentModel<TEntity>>();

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
