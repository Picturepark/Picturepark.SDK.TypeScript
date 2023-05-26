import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  ChangeDetectionStrategy,
  Inject,
  Optional,
  signal,
} from '@angular/core';
import { SafeUrl, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BROKEN_IMAGE_URL } from '../../../utilities/constants';
import { switchMap, map, tap, finalize, catchError } from 'rxjs/operators';
import { BaseBrowserItemComponent } from '../browser-item-base/browser-item-base.component';
import {
  ThumbnailSize,
  Content,
  ShareDetail,
  ShareContentDetail,
  ContentFacade,
  PICTUREPARK_CDN_URL,
  ShareDataEmbed,
  ContentService,
  ShareOutputDisplayContent,
} from '@picturepark/sdk-v2-angular';
import { imageLoaderErrorHandler } from '../image-loader.helper';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'pp-content-item-thumbnail',
  templateUrl: './content-item-thumbnail.component.html',
  styleUrls: ['./content-item-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TranslatePipe, LazyLoadDirective],
})
export class ContentItemThumbnailComponent extends BaseBrowserItemComponent<Content> implements OnChanges {
  /**
   * The item from wich to show the thumbnail
   */
  @Input() item: Content | ShareContentDetail;

  /**
   *  * If passed into the component, the thumbnail will be retrieved from the shareItem instead of being requested.
   *  * Mainly used for the share viewer as the lack of authentication makes it impossible to request the thumbnail of the content
   */
  @Input() shareItem?: ShareDetail;

  /**
   * If true the image will have a shadow box around
   */
  @Input() shadow: boolean;
  @Input() cover: boolean;

  isLoading = signal(false);
  virtualItemHtml = signal<SafeHtml | null>(null);
  thumbnailUrl = signal<SafeUrl | null>(null);

  constructor(
    private contentService: ContentService,
    private contentFacade: ContentFacade,
    private sanitizer: DomSanitizer,
    @Optional() @Inject(PICTUREPARK_CDN_URL) private cdnUrl?: string
  ) {
    super();
    this.cdnUrl = this.cdnUrl || '';
  }

  async ngOnChanges(changes: SimpleChanges) {
    const handleVirtual = this.item.isVirtual() && !this.item.displayContentId;

    if (changes['shareItem']) {
      if (this.shareItem) {
        if (handleVirtual) {
          this.handleVirtualItem();
        } else {
          const content = this.item as ShareContentDetail;
          if (content) {
            const output =
              content.outputs.find(
                i => i instanceof ShareOutputDisplayContent && i.outputFormatId === 'Thumbnail' + this.thumbnailSize
              ) ?? content.outputs.find(i => i.outputFormatId === 'Thumbnail' + this.thumbnailSize);
            this.isLoading.set(true);
            this.sub = this.loadItem
              .pipe(
                map(() =>
                  this.trust(
                    output?.viewUrl ??
                      content.iconUrl ??
                      `${this.cdnUrl}/icon/${(this.shareItem?.data as ShareDataEmbed).token}/${
                        content.displayContentId ?? content.id
                      }`
                  )
                ),
                finalize(() => this.isLoading.set(false))
              )
              .subscribe(url => this.thumbnailUrl.set(url));
          }
        }
      }
    } else {
      if (changes['item']) {
        if (handleVirtual) {
          this.handleVirtualItem();
        } else {
          this.sub = this.loadItem
            .pipe(
              tap(() => this.isLoading.set(true)),
              switchMap(() => {
                return this.contentService
                  .downloadThumbnail(
                    this.item.displayContentId ?? this.item.id,
                    this.thumbnailSize || ThumbnailSize.Small,
                    null,
                    null
                  )
                  .pipe(
                    catchError(imageLoaderErrorHandler),
                    finalize(() => this.isLoading.set(false))
                  );
              }),
              map(response => this.trust(URL.createObjectURL(response.data)))
            )
            .subscribe(url => this.thumbnailUrl.set(url));
        }
      }
    }

    if (changes['thumbnailSize'] && !this.item?.isVirtual() && this.isVisible()) {
      const updateImage =
        changes['thumbnailSize'].firstChange ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Small && this.isListView === false) ||
        (changes['thumbnailSize'].previousValue === ThumbnailSize.Medium && this.thumbnailSize === ThumbnailSize.Large);

      if (updateImage) {
        this.isLoading.set(true);
        this.loadItem.next();
      }
    }
  }

  handleVirtualItem() {
    if (this.item.displayValues['thumbnail']) {
      this.thumbnailUrl.set(null);
      this.virtualItemHtml.set(this.contentFacade.getVirtualItemHtml(this.item.displayValues['thumbnail']));
      this.isLoading.set(false);
    }
  }

  private trust(data: any) {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  setErrorImage(event) {
    if (event.path && event.path[0].src !== BROKEN_IMAGE_URL) {
      event.path[0].src = BROKEN_IMAGE_URL;
    } else if (event.target?.src && event.target.src !== BROKEN_IMAGE_URL) {
      event.target.src = BROKEN_IMAGE_URL;
    }
  }

  onLoad(event: any) {
    if (event?.target) {
      const width = event.target.naturalWidth;
      const height = event.target.naturalHeight;
      const factor = width / height;

      // If aspect is in a specific range, cover the content to fit thumbnail.
      this.cover = factor > 1.3 && factor < 1.8;
    }
  }
}
