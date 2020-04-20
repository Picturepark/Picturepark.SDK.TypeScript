import {
  Component,
  OnChanges,
  SimpleChanges,
  SecurityContext,
  Input,
  Injector,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { BROKEN_IMAGE_URL } from '../../../utilities/constants';
import { switchMap, map, tap } from 'rxjs/operators';
import { BaseBrowserItemComponent } from '../browser-item-base/browser-item-base.component';
import { ThumbnailSize, Content, ShareDetail, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { ContentService, fetchContentById } from '@picturepark/sdk-v1-angular';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'pp-content-item-thumbnail',
  templateUrl: './content-item-thumbnail.component.html',
  styleUrls: ['./content-item-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentItemThumbnailComponent extends BaseBrowserItemComponent<Content> implements OnChanges {
  /**
   * The item from wich to show the thumbnail
   */
  @Input() item?: Content | ShareContentDetail;

  /**
   * The id of the item from wich to show the thumbnail
   */
  @Input() itemId?: string;

  /**
   *  * If passed into the component, the thumbnail will be retrieved from the shareItem instead of being requested.
   *  * Mainly used for the share viewer as the lack of authentication makes it impossible to request the thumbnail of the content
   */
  @Input() shareItem?: ShareDetail;

  /**
   * If true the image will have a shadow box around
   */
  @Input() shadow: boolean;

  public isLoading = true;
  public thumbnailUrl$: Observable<SafeUrl | undefined> | null;

  public virtualItemHtml$: Observable<string | null> | null;

  public constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    protected injector: Injector
  ) {
    super(injector);
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['shareItem']) {
      if (this.shareItem) {
        const content = this.shareItem.contentSelections.find(i => i.id === this.item!.id);
        if (content) {
          const output = content.outputs.find(i => i.outputFormatId === 'Thumbnail' + this.thumbnailSize);
          this.thumbnailUrl$ = this.loadItem.pipe(
            map(() => this.trust(output?.viewUrl || content.iconUrl)),
            tap(() => (this.isLoading = false))
          );
        }
      }
    } else {
      if (changes['itemId']) {
        if (this.itemId) {
          this.sub = fetchContentById(this.contentService, this.itemId).subscribe(item => {
            if (item) {
              this.item = item;
              this.loadItem.next();
            }
          });
          this.handleItemDisplay();
        }
      }

      if (changes['item']) {
        if (this.item) {
          this.handleItemDisplay();
        }
      }
    }

    if (changes['thumbnailSize'] && !this.item?.isVirtual() && this.isVisible) {
      const updateImage =
        changes['thumbnailSize'].firstChange ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Small && this.isListView === false) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Medium && this.thumbnailSize === ThumbnailSize.Large);

      if (updateImage) {
        this.isLoading = true;
        this.loadItem.next();
      }
    }
  }

  handleItemDisplay() {
    this.virtualItemHtml$ = this.loadItem.pipe(
      map(() => {
        if (this.item?.isVirtual()) {
          if (this.item.displayValues['thumbnail']) {
            this.thumbnailUrl$ = null;
            return this.sanitizer.sanitize(SecurityContext.HTML, this.item.displayValues['thumbnail']);
          }
        }
        return null;
      })
    );

    this.thumbnailUrl$ = this.loadItem.pipe(
      switchMap(() => {
        if (this.item) {
          return this.contentService.downloadThumbnail(
            this.item.id,
            this.thumbnailSize || ThumbnailSize.Small,
            null,
            null
          );
        } else {
          return of(null);
        }
      }),
      map(response => {
        if (response) {
          this.isLoading = false;
          return this.trust(URL.createObjectURL(response.data));
        }
      })
    );
  }

  private trust(data: any) {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  public updateUrl(event) {
    event.path[0].src = BROKEN_IMAGE_URL;
  }
}
