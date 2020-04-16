import {
  Component,
  OnChanges,
  SimpleChanges,
  SecurityContext,
  OnInit,
  Input,
  Injector,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SafeUrl, SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NON_VIRTUAL_CONTENT_SCHEMAS_IDS, BROKEN_IMAGE_URL } from '../../../utilities/constants';
import { switchMap, map, tap } from 'rxjs/operators';
import { BaseBrowserItemComponent } from '../browser-item-base/browser-item-base.component';
import { ThumbnailSize, Content, ShareDetail, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { ContentService, fetchContentById } from '@picturepark/sdk-v1-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'pp-content-item-thumbnail',
  templateUrl: './content-item-thumbnail.component.html',
  styleUrls: ['./content-item-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentItemThumbnailComponent extends BaseBrowserItemComponent<Content> implements OnChanges, OnInit {
  /**
   * The item from wich to show the thumbnail
   */
  @Input() item: Content | ShareContentDetail;

  /**
   * The id of the item from wich to show the thumbnail
   */
  @Input() itemId: string;

  /**
   *  * If passed into the component, the thumbnail will be retrieved from the shareItem instead of being requested.
   *  * Mainly used for the share viewer as the lack of authentication makes it impossible to request the thumbnail of the content
   */
  @Input() shareItem: ShareDetail;

  /**
   * If true the image will have a shadow box around
   */
  @Input() shadow: boolean;

  public isLoading = false;
  public thumbnailUrl$: Observable<SafeUrl> | null;

  public virtualItemHtml: SafeHtml | null;

  public constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    protected injector: Injector
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.isLoading = true;
    // if (this.shareItem) {
    //   const content = this.shareItem.contentSelections.find(i => i.id === this.item.id);

    //   if (content) {
    //     const output = content.outputs.find(i => i.outputFormatId === 'Thumbnail' + this.thumbnailSize);
    //     this.thumbnailUrl$ = this.loadItem.pipe(
    //       map(() => this.trust(output?.viewUrl || content.iconUrl)),
    //       tap(() => (this.isLoading = false))
    //     );
    //   }
    //   return;
    // }

    // if (this.itemId) {
    //   const fetchContentResult = await fetchContentById(this.contentService, this.itemId).toPromise();
    //   if (fetchContentResult) {
    //     this.item = fetchContentResult;
    //   }
    //   this.itemUpdated(this.item);
    // }

    // if (this.item) {
    //   this.thumbnailUrl$ = this.loadItem.pipe(
    //     switchMap(() =>
    //       this.contentService.downloadThumbnail(this.item.id, this.thumbnailSize || ThumbnailSize.Small, null, null)
    //     ),
    //     map(response => this.trust(URL.createObjectURL(response.data))),
    //     tap(() => (this.isLoading = false))
    //   );
    // }

  }

  async ngOnChanges(changes: SimpleChanges) {

    if (changes['shareItem']) {
      const content = this.shareItem.contentSelections.find(i => i.id === this.item.id);
      if (content) {
        const output = content.outputs.find(i => i.outputFormatId === 'Thumbnail' + this.thumbnailSize);
        this.thumbnailUrl$ = this.loadItem.pipe(
          map(() => this.trust(output?.viewUrl || content.iconUrl)),
          tap(() => (this.isLoading = false))
        );
      }
    } else {
      if (changes['itemId']) {

        this.sub = fetchContentById(this.contentService, this.itemId).subscribe( fetchContentResult => {
          if (fetchContentResult) {
            this.item = fetchContentResult;
          }
          this.itemUpdated(this.item);
        });

      }

      // this.thumbnailUrl$ = this.loadItem.pipe(
      //   switchMap(() =>
      //     this.contentService.downloadThumbnail(this.item.id, this.thumbnailSize || ThumbnailSize.Small, null, null)
      //   ),
      //   map(response => this.trust(URL.createObjectURL(response.data))),
      //   tap(() => (this.isLoading = false))
      // );
      // setTimeout(() => {
      //   this.loadItem.next();
      // }, 3000);
  
      if (changes['item'] ) {
        this.itemUpdated(this.item);
      }
    }


    if (changes['thumbnailSize'] && !this.virtualItemHtml && this.isVisible) {
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

  itemUpdated(item: Content | ShareContentDetail) {
    if (!NON_VIRTUAL_CONTENT_SCHEMAS_IDS.includes(item.contentSchemaId)) {
      if (item.displayValues['thumbnail']) {
        this.virtualItemHtml = this.sanitizer.sanitize(SecurityContext.HTML, item.displayValues['thumbnail']);
      }
    }

    this.thumbnailUrl$ = this.loadItem.pipe(
      switchMap(() =>
        this.contentService.downloadThumbnail(item.id, this.thumbnailSize || ThumbnailSize.Small, null, null)
      ),
      map(response => this.trust(URL.createObjectURL(response.data))),
      tap(() => (this.isLoading = false))
    );
  }

  private trust(data: any) {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  public updateUrl(event) {
    event.path[0].src = BROKEN_IMAGE_URL;
  }
}
